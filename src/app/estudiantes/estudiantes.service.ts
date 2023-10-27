import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly dbEstudiante: Repository<Estudiante>,

    @InjectRepository(User)
    private readonly dbUsuario: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async registrarEstudiante(createEstudianteDto: CreateEstudianteDto) {
    try {
      const usuario = await this.dbUsuario.findOne({
        where: { id: createEstudianteDto.idUsuario, Rol: 'estudiante' },
      });

      if (!usuario) {
        throw new NotFoundException('El usuario con ese rol no existe en la base de datos');
      }

      const { Nombre, Apellido } = usuario;

      const estudiante = this.dbEstudiante.create({
        ...createEstudianteDto,
        NombreCompleto: `${Nombre} ${Apellido}`,
        usuario: usuario,
      });

      return await this.dbEstudiante.save(estudiante);
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException('Ya existe un docente con la misma colegiatura o firma digital');
      }
      throw error;
    }
  }

  async obtenerEstudiantes() {
    try {
      return await this.dbEstudiante.find();
    } catch (error) {
      throw error;
    }
  }

  async obtenerEstudiantesEliminados() {
    try {
      const usuarios = await this.dbEstudiante.find({
        withDeleted: true,
        where: { activo: false },
      });
      return usuarios;
    } catch (error) {
      throw error;
    }
  }

  async buscarUnEstudiantePorId(id: number) {
    try {
      const estudiante = await this.dbEstudiante
        .createQueryBuilder('estudiante')
        .select(['estudiante.id', 'estudiante.NombreCompleto', 'estudiante.Firma'])
        .where('estudiante.id = :id', { id })
        .getOne();

      if (!estudiante) {
        throw new NotFoundException('El estudiante no existe');
      }

      return estudiante;
    } catch (error) {
      throw error;
    }
  }

  async buscarUnEstudiantePorNombre(nombre: string) {
    try {
      const estudiante = await this.dbEstudiante
        .createQueryBuilder('estudiante')
        .select(['estudiante.id', 'estudiante.NombreCompleto', 'estudiante.Firma'])
        .where('estudiante.NombreCompleto = :nombre', { nombre })
        .getOne();

      if (!estudiante) {
        throw new NotFoundException('El estudiante no existe');
      }

      return estudiante;
    } catch (error) {
      throw error;
    }
  }

  async actualizarUnEstudiante(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    try {
      const estudiante = await this.dbEstudiante.preload({
        id,
        ...updateEstudianteDto,
      });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no existe');
      }
      return await this.dbEstudiante.save(estudiante);
    } catch (error) {
      throw error;
    }
  }

  async eliminarUnEstudiante(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const estudiante = await this.dbEstudiante.findOne({ where: { id } });
      if (!estudiante) {
        throw new NotFoundException('El estudiante no existe');
      }
      if (!estudiante.usuario) {
        throw new NotFoundException('El usuario no existe');
      }

      estudiante.activo = false;
      estudiante.usuario.activo = false;

      await queryRunner.manager.save([estudiante, estudiante.usuario]);
      await queryRunner.manager.softDelete(Estudiante, id);
      await queryRunner.manager.softDelete(User, estudiante.usuario.id);

      await queryRunner.commitTransaction();
      return {
        message: `El estudiante con el id ${id} ha sido eliminado`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async restaurarUnEstudiante(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const estudiante = await this.dbEstudiante.findOne({
        where: { id },
        withDeleted: true,
      });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no existe');
      }
      if (!estudiante.usuario) {
        throw new BadRequestException('El usuario no existe');
      }
      estudiante.activo = true;
      estudiante.usuario.activo = true;

      estudiante.deletedAt = null;
      estudiante.usuario.deletedAt = null;

      await queryRunner.manager.save(estudiante);
      await queryRunner.manager.save(estudiante.usuario);
      await queryRunner.commitTransaction();
      return {
        message: `El estudiante con el id ${id} ha sido restaurado`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
