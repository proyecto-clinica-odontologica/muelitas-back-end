import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenIntrabucalDto } from './dto/create-examen-intrabucal.dto';
import { UpdateExamenIntrabucalDto } from './dto/update-examen-intrabucal.dto';
import { ExamenIntrabucal } from './entities/examen-intrabucal.entity';

@Injectable()
export class ExamenIntrabucalService {
  constructor(
    @InjectRepository(ExamenIntrabucal)
    private readonly tblExamenIntrabucal: Repository<ExamenIntrabucal>,
  ) {}

  async crearExamenIntrabucal(createExamenIntrabucalDto: CreateExamenIntrabucalDto) {
    try {
      const examen = this.tblExamenIntrabucal.create(createExamenIntrabucalDto);
      await this.tblExamenIntrabucal.save(examen);

      return this.omitirCampos(examen);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el examen intrabucal');
    }
  }

  async obtenerExamenesIntrabucales() {
    try {
      return await this.tblExamenIntrabucal.find({
        where: { activo: true },
        select: [
          'id',
          'Digastrico',
          'Esternocleidomastoideo',
          'Masetero',
          'PteriogoideoExterno',
          'PteriogoideoInterno',
          'Temporal',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerExamenesIntrabucalesEliminados() {
    try {
      return await this.tblExamenIntrabucal.find({
        where: { activo: false },
        select: [
          'id',
          'Digastrico',
          'Esternocleidomastoideo',
          'Masetero',
          'PteriogoideoExterno',
          'PteriogoideoInterno',
          'Temporal',
        ],
        withDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarExamenIntrabucalPorId(id: number, checkDeleted: boolean = false) {
    try {
      const examen = await this.tblExamenIntrabucal.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!examen) {
        throw new NotFoundException('No se encontró el examen intrabucal');
      }

      if (!checkDeleted && examen.deletedAt) {
        throw new NotFoundException('El examen intrabucal ya fue eliminado');
      }

      if (checkDeleted && !examen.deletedAt) {
        throw new NotFoundException('El examen intrabucal no está eliminado');
      }

      return this.omitirCampos(examen);
    } catch (error) {
      throw error;
    }
  }

  async actualizarExamenIntrabucal(id: number, updateExamenIntrabucalDto: UpdateExamenIntrabucalDto) {
    try {
      const examen = await this.tblExamenIntrabucal.preload({
        id,
        ...updateExamenIntrabucalDto,
      });

      if (!examen) {
        throw new NotFoundException('No se encontró el examen intrabucal');
      }

      await this.tblExamenIntrabucal.save(examen);

      return this.omitirCampos(examen);
    } catch (error) {
      throw error;
    }
  }

  async eliminarExamenIntrabucal(id: number) {
    try {
      const examen = await this.buscarExamenIntrabucalPorId(id);
      await this.tblExamenIntrabucal.update(examen.id, { activo: false, deletedAt: new Date() });

      return {
        message: `Examen intrabucal eliminado correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarExamenIntrabucal(id: number) {
    try {
      const examen = await this.buscarExamenIntrabucalPorId(id, true);
      await this.tblExamenIntrabucal.update(examen.id, { activo: true, deletedAt: null });

      return {
        message: `Examen intrabucal restaurado correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: Partial<ExamenIntrabucal>): Partial<ExamenIntrabucal> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
