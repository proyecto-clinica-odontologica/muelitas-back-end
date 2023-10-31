import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInterpretacionDto } from './dto/create-interpretacion.dto';
import { UpdateInterpretacionDto } from './dto/update-interpretacion.dto';
import { Interpretacion } from './entities/interpretacion.entity';

@Injectable()
export class InterpretacionService {
  constructor(
    @InjectRepository(Interpretacion)
    private readonly tblInterpretacion: Repository<Interpretacion>,
  ) {}

  async registrarInterpretacion(createInterpretacionDto: CreateInterpretacionDto) {
    try {
      const interpretacion = this.tblInterpretacion.create(createInterpretacionDto);
      await this.tblInterpretacion.save(interpretacion);

      return this.omitirCampos(interpretacion);
    } catch (error) {
      throw error;
    }
  }

  async obtenerInterpretaciones() {
    try {
      const interpretaciones = await this.tblInterpretacion.find({
        where: { activo: true },
      });

      return this.camposVisibles(interpretaciones);
    } catch (error) {
      throw error;
    }
  }

  async obtenerInterpretacionesEliminadas() {
    try {
      const interpretaciones = await this.tblInterpretacion.find({
        where: { activo: false },
        withDeleted: true,
      });

      return this.camposVisibles(interpretaciones);
    } catch (error) {
      throw error;
    }
  }

  async buscarInterpretacionPorId(id: number, checkDeleted: boolean = false) {
    try {
      const interpretacion = await this.tblInterpretacion.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!interpretacion) {
        throw new NotFoundException(`No existe la interpretacion`);
      }

      if (!checkDeleted && interpretacion.deletedAt) {
        throw new NotFoundException(`La interpretacion está eliminada`);
      }

      if (checkDeleted && !interpretacion.deletedAt) {
        throw new NotFoundException(`La interpretacion no está eliminada`);
      }

      return this.omitirCampos(interpretacion);
    } catch (error) {
      throw error;
    }
  }

  async actualizarInterpretacion(id: number, updateInterpretacionDto: UpdateInterpretacionDto) {
    try {
      const interpretacion = await this.tblInterpretacion.preload({
        id,
        ...updateInterpretacionDto,
      });

      if (!interpretacion) {
        throw new NotFoundException(`No existe la interpretacion`);
      }

      await this.tblInterpretacion.save(interpretacion);
      return this.omitirCampos(interpretacion);
    } catch (error) {
      throw error;
    }
  }

  async eliminarInterpretacion(id: number) {
    try {
      const interpretacion = await this.buscarInterpretacionPorId(id);
      await this.tblInterpretacion.update(interpretacion.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'Interpretacion eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarInterpretacion(id: number) {
    try {
      const interpretacion = await this.buscarInterpretacionPorId(id, true);
      await this.tblInterpretacion.update(interpretacion.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'Interpretacion restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(interpretacion: Interpretacion) {
    const { activo, deletedAt, ...resto } = interpretacion;
    return resto;
  }

  private camposVisibles(interpretaciones: Interpretacion[]) {
    return interpretaciones.map((interpretacion) => this.omitirCampos(interpretacion));
  }
}
