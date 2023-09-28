import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,
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
      user,
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

  async buscarUsuario(id: string) {
    let usuario: User;
    try {
      if (isNaN(+id)) {
        const query = this.dbUser.createQueryBuilder('user');
        usuario = await query
          .where(
            'user.correo = :correo or user.nombre = :nombre or user.apellido = :apellido',
            {
              correo: id,
              nombre: id,
              apellido: id,
            },
          )
          .getOne();
      } else {
        const query = this.dbUser.createQueryBuilder('user');
        usuario = await query
          .where(
            'user.numDocumento = :numDocumento or user.celular = :celular or user.id = :id',
            {
              numDocumento: id,
              celular: id,
              id: id,
            },
          )
          .getOne();
      }
      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el id ${id} no existe en la base de datos`,
        );
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  checkStatus(user: User) {
    return {
      ...user,
    };
  }

  private handleExceptions(error: any): never {
    this.logger.error(error);

    if (error.errno === 1062) {
      throw new BadRequestException(error);
    }

    throw new InternalServerErrorException('revisa los logs del servidor');
  }
}
