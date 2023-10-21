import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente } from './entities/docente.entity';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente)
    private readonly dbDocente: Repository<Docente>,

    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async registrarDocente(createDocenteDto: CreateDocenteDto) {
    try {
      const usuario = await this.dbUser.findOne({
        where: { id: createDocenteDto.UsuarioId, Rol: 'docente' },
      });

      if (!usuario) {
        throw new NotFoundException(
          'El usuario con ese rol no existe en la base de datos',
        );
      }

      const { Nombre, Apellido } = usuario;

      const docente = this.dbDocente.create({
        ...createDocenteDto,
        NombreCompleto: `${Nombre} ${Apellido}`,
        usuario: usuario,
      });

      return await this.dbDocente.save(docente);
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException(
          'Ya existe un docente con la misma colegiatura o firma digital',
        );
      }
      throw error;
    }
  }

  async ObtenerDocentes() {
    try {
      const docentes = await this.dbDocente.find({
        select: ['id', 'NombreCompleto', 'Colegiatura', 'FirmaDigital'],
      });

      return docentes;
    } catch (error) {
      throw error;
    }
  }

  async obtenerDocentesEliminados() {
    try {
      return await this.dbDocente.find({
        withDeleted: true,
        where: { activo: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarDocentePorId(id: number) {
    try {
      const usuario = await this.dbUser.findOne({
        where: {
          Rol: 'docente',
          docente: {
            id: id,
          },
        },
        relations: ['sede', 'docente'],
      });

      if (!usuario) {
        throw new NotFoundException('El usuario no existe');
      }

      const nDocente = usuario.docente[0];
      const { docente, ...resto } = usuario;

      return {
        ...resto,
        docente: nDocente,
      };
    } catch (error) {
      throw error;
    }
  }

  async buscarDocentePorNombre(nombre: string) {
    try {
      const docente = await this.dbDocente.findOne({
        where: { NombreCompleto: nombre },
        select: ['id', 'NombreCompleto', 'Colegiatura', 'FirmaDigital'],
        relations: ['clases'],
      });

      if (!docente) {
        throw new NotFoundException('Docente no existe');
      }

      delete docente.usuario;

      return docente;
    } catch (error) {
      throw error;
    }
  }

  async actualizarDocente(id: number, updateDocenteDto: UpdateDocenteDto) {
    try {
      const docente = await this.dbDocente.preload({
        id,
        ...updateDocenteDto,
      });
      if (!docente) {
        throw new BadRequestException(
          'No existe el docente que desea actualizar',
        );
      }
      return await this.dbDocente.save(docente);
    } catch (error) {
      throw error;
    }
  }

  async eliminarDocente(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const docente = await this.dbDocente.findOne({ where: { id } });
      if (!docente) {
        throw new NotFoundException('No existe el docente que desea eliminar');
      }
      if (!docente.usuario) {
        throw new NotFoundException('No existe usuario');
      }

      docente.activo = false;
      docente.usuario.activo = false;

      await queryRunner.manager.save([docente, docente.usuario]);
      await queryRunner.manager.softDelete(Docente, id);
      await queryRunner.manager.softDelete(User, docente.usuario.id);

      await queryRunner.commitTransaction();

      return {
        message: 'Docente eliminado correctamente',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async restaurarDocente(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const docente = await this.dbDocente.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!docente) {
        throw new NotFoundException('No existe el docente que desea restaurar');
      }

      if (!docente.usuario) {
        throw new NotFoundException('No existe usuario');
      }

      docente.deletedAt = null;
      docente.usuario.deletedAt = null;

      docente.activo = true;
      docente.usuario.activo = true;

      await queryRunner.manager.save(docente);
      await queryRunner.manager.save(docente.usuario);

      await queryRunner.commitTransaction();

      return {
        message: 'Docente restaurado correctamente',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
