import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { Periodo } from './entities/periodo.entity';

@Injectable()
export class PeriodosService {
  constructor(
    @InjectRepository(Periodo)
    private readonly dbPeriodo: Repository<Periodo>,
  ) {}

  async registrarPeriodo(createPeriodoDto: CreatePeriodoDto) {
    try {
      const periodo = this.dbPeriodo.create(createPeriodoDto);
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

  async buscarUnPeriodo(id: number) {
    try {
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
    try {
      const periodo = await this.dbPeriodo.findOneBy({ id });
      if (!periodo) {
        throw new NotFoundException('No existe el periodo');
      }
      periodo.activo = false;
      await this.dbPeriodo.save(periodo);
      await this.dbPeriodo.softDelete(id);
      return {
        message: `Se ha eliminado el periodo con id ${id}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarPeriodo(id: number) {
    try {
      await this.dbPeriodo.restore(id);
      const periodo = await this.dbPeriodo.findOneBy({ id });
      if (!periodo) {
        throw new NotFoundException(`No existe el periodo con el id ${id}`);
      }
      periodo.activo = true;
      await this.dbPeriodo.save(periodo);
      return {
        message: `Se ha restaurado el periodo con id ${id}`,
      };
    } catch (error) {
      throw error;
    }
  }
}
