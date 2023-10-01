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

  async crearCuenta(createUserDto: CreateUserDto) {
    const { Contra, ...restoPropiedades } = createUserDto;

    try {
      const usuario = this.dbUser.create({
        Contra: bcrypt.hashSync(Contra, 10),
        ...restoPropiedades,
      });

      await this.dbUser.save(usuario);
      delete usuario.Contra;

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { Contra, Correo, Celular } = loginUserDto;

    let usuario: User;

    const query = this.dbUser.createQueryBuilder('login');

    usuario = await query
      .where('login.Correo = :Correo or login.Celular = :Celular', {
        Correo,
        Celular,
      })
      .select(['login.id', 'login.Correo', 'login.Contra', 'login.Nombre'])
      .getOne();

    if (!usuario || !bcrypt.compareSync(Contra, usuario.Contra)) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }

    return usuario;
  }

  async cambiarPassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { RepiteContraNueva, Contra } = changePasswordDto;

    try {
      const usuario = await this.dbUser.findOneBy({ id });

      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el id ${id} no existe en la base de datos`,
        );
      }

      if (!bcrypt.compareSync(Contra, usuario.Contra)) {
        throw new UnauthorizedException('Las credenciales no son validas');
      }

      const contraNueva = await this.dbUser.preload({
        id: id,
        Contra: bcrypt.hashSync(RepiteContraNueva, 10),
      });

      return this.dbUser.save(contraNueva);
    } catch (error) {
      throw error;
    }
  }

  async buscarUsuario(terminoBusqueda: string) {
    let usuario: User;
    try {
      const query = this.dbUser.createQueryBuilder('usuario');
      if (isNaN(+terminoBusqueda)) {
        usuario = await query
          .where(
            'usuario.Correo = :Correo or usuario.Nombre = :Nombre or usuario.Apellido = :Apellido',
            {
              Correo: terminoBusqueda,
              Nombre: terminoBusqueda,
              Apellido: terminoBusqueda,
            },
          )
          .getOne();
      } else {
        usuario = await query
          .where(
            'usuario.NumDoc = :NumDoc or usuario.Celular = :Celular or usuario.id = :id',
            {
              NumDoc: terminoBusqueda,
              Celular: terminoBusqueda,
              id: terminoBusqueda,
            },
          )
          .getOne();
      }

      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el id ${terminoBusqueda} no existe en la base de datos`,
        );
      }

      return usuario;
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
