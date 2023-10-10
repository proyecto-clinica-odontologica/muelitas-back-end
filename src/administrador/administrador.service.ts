import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly dbAdministrador: Repository<Administrador>,

    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}
  async registrarAdministrador(createAdministradorDto: CreateAdministradorDto) {
    try {
      const usuario = await this.dbUser.findOne({
        where: { id: createAdministradorDto.idUsuario, Rol: 'administrador' },
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const { Nombre, Apellido } = usuario;

      const administrador = this.dbAdministrador.create({
        ...createAdministradorDto,
        NombreCompleto: `${Nombre} ${Apellido}`,
        usuario,
      });

      return await this.dbAdministrador.save(administrador);
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException(
          'El administrador con ese codigo de acceso ya existe',
        );
      }
      throw error;
    }
  }

  async obtenerAdministradores() {
    try {
      return this.dbAdministrador.find();
    } catch (error) {
      throw error;
    }
  }

  async obtenerAdministradoresEliminados() {
    try {
      return this.dbAdministrador.find({ withDeleted: true });
    } catch (error) {
      throw error;
    }
  }

  async buscarAdministradorPorId(id: number) {
    try {
      const administrador = await this.dbAdministrador
        .createQueryBuilder('administrador')
        .select(['administrador.NombreCompleto', 'administrador.CodigoAcceso'])
        .where('administrador.id = :id', { id })
        .getOne();

      if (!administrador) {
        throw new NotFoundException('El administrador no existe');
      }

      return administrador;
    } catch (error) {
      throw error;
    }
  }

  async buscarAdministradorPorNombre(nombre: string) {
    try {
      const administradores = await this.dbAdministrador
        .createQueryBuilder('administrador')
        .select(['administrador.NombreCompleto', 'administrador.CodigoAcceso'])
        .where('administrador.NombreCompleto LIKE :nombre', {
          nombre: nombre + '%',
        })
        .getMany();

      if (!administradores.length) {
        throw new NotFoundException(
          'No se encontraron administradores con ese nombre',
        );
      }

      return administradores;
    } catch (error) {
      throw error;
    }
  }

  async actualizarAdministrador(
    id: number,
    updateAdministradorDto: UpdateAdministradorDto,
  ) {
    try {
      const administrador = await this.dbAdministrador.preload({
        id,
        ...updateAdministradorDto,
      });
      if (!administrador) {
        throw new BadRequestException('El administrador no existe');
      }
      return await this.dbAdministrador.save(administrador);
    } catch (error) {
      throw error;
    }
  }

  async eliminarAdministrador(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const administrador = await this.dbAdministrador.findOne({
        where: { id },
        relations: ['usuario'],
      });

      if (!administrador || !administrador.usuario) {
        throw new NotFoundException('El administrador o usuario no existe');
      }

      administrador.activo = false;
      administrador.usuario.activo = false;

      await queryRunner.manager.save([administrador, administrador.usuario]);

      await queryRunner.manager.softDelete(Administrador, id);
      await queryRunner.manager.softDelete(User, administrador.usuario.id);

      await queryRunner.commitTransaction();

      return {
        message: `Administrador con el id ${id} fue dado de baja`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async restaurarAdministrador(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const administrador = await this.dbAdministrador.findOne({
        where: { id },
        withDeleted: true,
        relations: ['usuario'],
      });

      if (!administrador || !administrador.usuario) {
        throw new NotFoundException('El administrador o usuario no existe');
      }

      administrador.activo = true;
      administrador.usuario.activo = true;

      await queryRunner.manager.save([administrador, administrador.usuario]);

      await queryRunner.manager.restore(Administrador, id);
      await queryRunner.manager.restore(User, administrador.usuario.id);

      await queryRunner.commitTransaction();

      return {
        message: `Administrador con el id ${id} fue restaurado`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
