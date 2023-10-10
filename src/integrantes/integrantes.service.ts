import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { Integrante } from './entities/integrante.entity';

@Injectable()
export class IntegrantesService {
  constructor(
    @InjectRepository(Integrante)
    private readonly dbIntegrante: Repository<Integrante>,

    @InjectRepository(Estudiante)
    private readonly dbEstudiante: Repository<Estudiante>,

    @InjectRepository(Clase)
    private readonly dbClase: Repository<Clase>,

    private readonly dataSource: DataSource,
  ) {}

  async registrarIntegrantes(createIntegranteDto: CreateIntegranteDto) {
    try {
      const estudiante = await this.dbEstudiante.findOne({
        where: { id: createIntegranteDto.IdEstudiante },
      });

      const clase = await this.dbClase.findOne({
        where: { id: createIntegranteDto.IdClase },
      });

      if (!clase) throw new NotFoundException('Clase no existe');

      if (!estudiante) throw new NotFoundException('Estudiante no existe');

      const integrante = this.dbIntegrante.create({
        ...createIntegranteDto,
        estudiante: estudiante,
        clase: clase,
      });

      return await this.dbIntegrante.save(integrante);
    } catch (error) {
      throw error;
    }
  }

  async obtenerIntegrantes() {
    try {
      return await this.dbIntegrante.find();
    } catch (error) {
      throw error;
    }
  }

  async obtenerIntegrantesEliminados() {
    try {
      return await this.dbIntegrante.find({
        withDeleted: true,
        where: { activo: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarIntegrantePorId(id: number) {
    try {
      const integrante = await this.dbIntegrante.findOne({
        where: { id },
        relations: ['estudiante', 'clase'],
      }); 
      if (!integrante) {
        throw new NotFoundException('Integrante no encontrado');
      }
      return integrante;
    } catch (error) {
      throw error;
    }
  }

  async actualizarIntegrante(
    id: number,
    updateIntegranteDto: UpdateIntegranteDto,
  ) {
    try {
      const integrante = await this.dbIntegrante.preload({
        id,
        ...updateIntegranteDto,
      });
      if (!integrante) {
        throw new NotFoundException('Integrante no existe');
      }
      return await this.dbIntegrante.save(integrante);
    } catch (error) {
      throw error;
    }
  }

  async eliminarIntegrante(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const integrantes = await this.dbIntegrante.findOne({
        where: { id },
        relations: ['estudiante', 'clase'],
      });

      if (!integrantes || !integrantes.estudiante || !integrantes.clase) {
        throw new NotFoundException('integrante 0 estudinte o clase no existe');
      }

      integrantes.activo = false;
      integrantes.clase.activo = false;
      integrantes.estudiante.activo = false;

      await queryRunner.manager.save([
        integrantes,
        integrantes.clase,
        integrantes.estudiante,
      ]);

      await queryRunner.manager.softDelete(Integrante, id);
      await queryRunner.manager.softDelete(
        Estudiante,
        integrantes.estudiante.id,
      );
      await queryRunner.manager.softDelete(Clase, integrantes.clase.id);
      await queryRunner.commitTransaction();

      return {
        message: 'Integrante eliminado',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarIntegrante(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const integrantes = await this.dbIntegrante.findOne({
        where: { id },
        relations: ['estudiante', 'clase'],
        withDeleted: true,
      });

      if (!integrantes || !integrantes.estudiante || !integrantes.clase) {
        throw new NotFoundException('integrante o estudinte o clase no existe');
      }

      integrantes.activo = true;
      integrantes.clase.activo = true;
      integrantes.estudiante.activo = true;

      integrantes.deletedAt = null;
      integrantes.clase.deletedAt = null;
      integrantes.estudiante.deletedAt = null;

      await queryRunner.manager.save([
        integrantes,
        integrantes.clase,
        integrantes.estudiante,
      ]);

      await queryRunner.commitTransaction();

      return {
        message: 'Integrante restaurado',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
