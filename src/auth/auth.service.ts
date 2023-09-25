import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
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
      const user = this.dbUser.create({
        contra: bcrypt.hashSync(contra, 10),
        ...restoPropiedades,
      });

      await this.dbUser.save(user);
      delete user.contra;

      return {
        ...user,
        token: this.getJwtToken({ correo: user.correo }),
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { contra, correo } = loginUserDto;
    const user = await this.dbUser.findOne({
      where: { correo },
      select: { correo: true, contra: true },
    });
    if (!user) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }

    if (!bcrypt.compareSync(contra, user.contra)) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }

    return {
      ...user,
      token: this.getJwtToken({ correo: user.correo }),
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
    console.log(error);
    throw new InternalServerErrorException('revisa los logs del servidor');
  }
}
