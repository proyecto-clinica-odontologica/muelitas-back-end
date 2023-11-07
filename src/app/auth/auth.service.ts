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
import { Sede } from '../sedes/entities/sede.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    @InjectRepository(Sede)
    private readonly dbSede: Repository<Sede>,
  ) {}

  async crearCuenta(createUserDto: CreateUserDto) {
    const { Contra, ...restoPropiedades } = createUserDto;

    try {
      const usuario = this.dbUser.create({
        Contra: bcrypt.hashSync(Contra, 10),
        ...restoPropiedades,
      });

      const sede = await this.dbSede.findOneBy({ id: createUserDto.SedeId });

      if (!sede) {
        throw new NotFoundException('La sede no existe');
      }

      usuario.sede = sede;

      await this.dbUser.save(usuario);
      delete usuario.Contra;

      return usuario;
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException('El correo o el numero de documento o el celular ya se encuentra registrado');
      }
      throw error;
    }
  }

  async actualizarUsuario(id: number, updateUserDto: UpdateUserDto) {
    delete updateUserDto.id;
    try {
      const usuario = await this.dbUser.preload({
        id,
        ...updateUserDto,
      });
      if (!usuario) {
        throw new NotFoundException(`El usuario con el id ${id} no existe en la base de datos`);
      }
      return await this.dbUser.save(usuario);
    } catch (error) {
      throw error;
    }
  }

  async eliminarUsuario(id: number) {
    try {
      const usuario = await this.dbUser.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException(`El usuario con el id ${id} no existe en la base de datos`);
      }
      usuario.activo = false;
      await this.dbUser.save(usuario);
      await this.dbUser.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async activarCuenta(id: number) {
    try {
      await this.dbUser.restore(id);
      const usuario = await this.dbUser.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException(`El usuario con el id ${id} no existe en la base de datos`);
      }
      usuario.activo = true;
      await this.dbUser.save(usuario);
      return {
        message: `El usuario con el id ${id} ha sido activado`,
      };
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

  async loginCelular(celular: string, contra: string) {
    try {
      const usuario = await this.dbUser.findOne({
        where: { Celular: celular },
        relations: ['sede'],
      });

      if (!usuario || !bcrypt.compareSync(contra, usuario.Contra)) {
        throw new UnauthorizedException('Las credenciales no son validas');
      }

      const SedeId = usuario.sede.id;
      delete usuario.sede;
      return {
        ...usuario,
        SedeId,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginEmail(correo: string, contra: string) {
    try {
      const usuario = await this.dbUser.findOne({
        where: { Correo: correo },
        relations: ['sede'],
      });

      if (!usuario || !bcrypt.compareSync(contra, usuario.Contra)) {
        throw new UnauthorizedException('Las credenciales no son validas');
      }
      const SedeId = usuario.sede.id;
      delete usuario.sede;
      return {
        ...usuario,
        SedeId,
      };
    } catch (error) {
      throw error;
    }
  }

  async cambiarPassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { RepiteContraNueva, Contra } = changePasswordDto;

    try {
      const usuario = await this.dbUser.findOneBy({ id });

      if (!usuario) {
        throw new NotFoundException(`El usuario con el id ${id} no existe en la base de datos`);
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

  private handleExceptions(error: any): never {
    this.logger.error(error);

    if (error.errno === 1062) {
      throw new BadRequestException(error);
    }

    throw new InternalServerErrorException('revisa los logs del servidor');
  }

  async solicitarRestablecerPassword(requestResetPasswordDto: RequestResetPasswordDto) {
    const { Correo } = requestResetPasswordDto;

    try {
      const usuario = await this.dbUser.findOneBy({ Correo });

      if (!usuario) {
        throw new NotFoundException(`El usuario con el correo ${Correo} no existe en la base de datos`);
      }

      const codigo = Math.floor(Math.random() * 100000000).toString();

      usuario.RestablecerContra = codigo;

      await this.dbUser.save(usuario);
      // TODO: enviar correo electronico con el codigo de restablecimiento de contraseña

      // const info = await this.mailerService.sendMail({
      //   to: usuario.email,
      //   from: 'APV - Administrador de pacientes de veterinaria', //
      //   subject: 'Reestablece tu password ✔',
      //   text: 'Reestablece tu password',
      //   html: `
      //   <p>Hola ${usuario.nombre} has solicitado reestablecer tu password</p>
      //   <p>Sigue el siguiente enlace para generar un nuevo password</p>
      //   <a href="${process.env.FRONT_URL}/auth/olvide-password/${usuario.token}">Reestablecer Password</a>
      //   <p>Si tu no solicitaste reestablecer la cuenta, puedes ignorar este mensaje</p>
      //   `,
      // });

      // console.log('Correo enviado %s', info.messageId);

    } catch (error) {
      throw error;
    }
  }

  async restablecerPassword(resetPasswordDto: ResetPasswordDto) {
    const { RestablecerPasswordToken, Contra } = resetPasswordDto;

    try {
      const usuario = await this.dbUser.findOneBy({
        RestablecerContra: RestablecerPasswordToken,
      });

      if (!usuario) {
        throw new NotFoundException();
      }

      usuario.Contra = bcrypt.hashSync(Contra, 10);
      usuario.RestablecerContra = null;

      await this.dbUser.save(usuario);
    } catch (error) {
      throw error;
    }
  }
}
