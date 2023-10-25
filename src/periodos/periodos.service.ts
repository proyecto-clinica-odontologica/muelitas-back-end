import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sede } from '../sedes/entities/sede.entity';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { Periodo } from './entities/periodo.entity';

@Injectable()
export class PeriodosService {
  constructor(
    @InjectRepository(Periodo)
    private readonly dbPeriodo: Repository<Periodo>,

    @InjectRepository(Sede)
    private readonly dbSede: Repository<Sede>,

    private readonly dataSource: DataSource,
  ) {}

  async registrarPeriodo(createPeriodoDto: CreatePeriodoDto) {
    try {
      const sede = await this.dbSede.findOne({
        where: { id: createPeriodoDto.SedeId },
      });

      if (!sede) {
        throw new NotFoundException('El periodo no existe');
      }

      const periodo = this.dbPeriodo.create({
        ...createPeriodoDto,
        sede: sede,
      });

      return await this.dbPeriodo.save(periodo);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPeriodos() {
    try {
      return await this.dbPeriodo.find();
    } catch (error) {
      throw error;
    }
  }

  async obtenerPeriodosEliminados() {
    try {
      return await this.dbPeriodo.find({
        withDeleted: true,
        where: { activo: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarPeriodoPorId(id: number) {
    try {
      const periodo = await this.dbPeriodo.findOne({
        where: { id },
      });

      if (!periodo) {
        throw new NotFoundException('No existe el periodo');
      }

      return periodo;
    } catch (error) {
      throw error;
    }
  }

  async buscarPeriodoPorNombre(nombrePeriodo: string) {
    try {
      const periodo = await this.dbPeriodo.findOne({
        where: { Nombre: nombrePeriodo },
        select: ['id', 'Nombre', 'FechaInicio', 'FechaFin'],
      });

      if (!periodo) {
        throw new NotFoundException('No existe el periodo');
      }

      delete periodo.sede.deletedAt;
      delete periodo.sede.activo;
      delete periodo.sede.id;

      return periodo;
    } catch (error) {
      throw error;
    }
  }

  async buscarPeriodosPorSede(nombreSede: string) {
    try {
      const sedes = await this.dbSede.findOne({
        where: { Nombre: nombreSede },
        relations: ['periodo'],
      });

      if (!sedes) {
        throw new NotFoundException('No existe la sede');
      }

      return sedes;
    } catch (error) {
      throw error;
    }
  }

  async actualizarPeriodo(id: number, updatePeriodoDto: UpdatePeriodoDto) {
    try {
      const periodo = await this.dbPeriodo.preload({
        id,
        ...updatePeriodoDto,
      });

      if (!periodo) {
        throw new NotFoundException('No existe el periodo');
      }

      return await this.dbPeriodo.save(periodo);
    } catch (error) {
      throw error;
    }
  }

  async eliminarPeriodo(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const periodo = await this.dbPeriodo.findOne({
        where: { id },
        relations: ['sede'],
      });
      if (!periodo) {
        throw new NotFoundException('No existe el periodo');
      }
      if (!periodo.sede) {
        throw new NotFoundException('No existe la sede');
      }

      periodo.activo = false;
      periodo.sede.activo = false;

      await queryRunner.manager.save([periodo, periodo.sede]);
      await queryRunner.manager.softDelete(Periodo, id);
      await queryRunner.manager.softDelete(Sede, periodo.sede.id);
      await queryRunner.commitTransaction();
      return {
        message: `Se ha eliminado el periodo con id ${id}`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async restaurarPeriodo(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const periodo = await this.dbPeriodo.findOne({
        where: { id },
        withDeleted: true,
        relations: ['sede'],
      });

      if (!periodo) {
        throw new NotFoundException(`El periodo con el id ${id} no existe`);
      }
      if (!periodo.sede) {
        throw new NotFoundException(`La sede con el id ${id} no existe`);
      }

      periodo.deletedAt = null;
      periodo.sede.deletedAt = null;

      periodo.activo = true;
      periodo.sede.activo = true;

      await queryRunner.manager.save([periodo, periodo.sede]);
      await queryRunner.commitTransaction();
      return {
        message: `Se ha restaurado el periodo con id ${id}`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
