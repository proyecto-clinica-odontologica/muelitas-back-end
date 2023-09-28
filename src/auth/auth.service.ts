import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { JwtoPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { contra, ...restoPropiedades } = createUserDto;

    try {
      const usuario = this.dbUser.create({
        contra: bcrypt.hashSync(contra, 10),
        ...restoPropiedades,
      });

      await this.dbUser.save(usuario);
      delete usuario.contra;

      return {
        usuario,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { contra, correo } = loginUserDto;

    const user = await this.dbUser.findOne({
      where: { correo },
      select: { correo: true, contra: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }

    if (!bcrypt.compareSync(contra, user.contra)) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }

    return {
      ...user,
      token: this.getJwtToken({ id: `${user.id}` }),
    };
  }

  async cambiarPassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { repiteContraNueva } = changePasswordDto;
    try {
      const usuario = await this.dbUser.findOneBy({ id });

      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el id ${id} no existe en la base de datos`,
        );
      }

      if (!bcrypt.compareSync(changePasswordDto.contraActual, usuario.contra)) {
        throw new UnauthorizedException('Las credenciales no son validas');
      }

      const contraNueva = await this.dbUser.preload({
        id: id,
        contra: bcrypt.hashSync(repiteContraNueva, 10),
      });

      return this.dbUser.save(contraNueva);
    } catch (error) {
      throw error;
    }
  }

  checkStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: `${user.id}` }),
    };
  }

  private getJwtToken(payload: JwtoPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExceptions(error: any): never {
    this.logger.error(error);

    if (error.errno === 1062) {
      throw new BadRequestException(error);
    }

    throw new InternalServerErrorException('revisa los logs del servidor');
  }
}
