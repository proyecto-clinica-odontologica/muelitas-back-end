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
import { CreateRolDto } from './dto/create-rol-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Rol } from './entities/role.entity';
import { User } from './entities/user.entity';
import { JwtoPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    @InjectRepository(Rol)
    private readonly dbRol: Repository<Rol>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { rol = 'estudiante', contra, ...restoPropiedades } = createUserDto;

    try {
      const role = await this.dbRol.findOneBy({ nombre: rol });

      if (!role) {
        throw new NotFoundException(
          `El rol ${rol} no existe en la base de datos`,
        );
      }

      const user = this.dbUser.create({
        contra: bcrypt.hashSync(contra, 10),
        ...restoPropiedades,
        rol: role,
      });

      await this.dbUser.save(user);
      delete user.contra;

      return {
        ...user,
        token: this.getJwtToken({ id: `${user.id}` }),
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

  async createRoles(createRolDto: CreateRolDto) {
    try {
      const roles = this.dbRol.create(createRolDto);
      return await this.dbRol.save(roles);
    } catch (error) {
      throw error;
    }
  }

  private handleExceptions(error: any): never {
    this.logger.error(error);

    if (error.errno === 1062) {
      throw new BadRequestException(error);
    }

    throw new InternalServerErrorException('revisa los logs del servidor');
  }
}
