import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenGeneralDto } from './dto/create-examen-general.dto';
import { UpdateExamenGeneralDto } from './dto/update-examen-general.dto';
import { ExamenGeneral } from './entities/examen-general.entity';

@Injectable()
export class ExamenGeneralService {
  constructor(
    @InjectRepository(ExamenGeneral)
    private readonly tblExamenGeneral: Repository<ExamenGeneral>,
  ) {}

  async registrarExamenGeneral(createExamenGeneralDto: CreateExamenGeneralDto) {
    try {
      const examenGeneral = this.tblExamenGeneral.create(createExamenGeneralDto);
      await this.tblExamenGeneral.save(examenGeneral);

      delete examenGeneral.deletedAt;
      delete examenGeneral.activo;

      return examenGeneral;
    } catch (error) {
      throw error;
    }
  }

  async obtenerExamenesGenerales() {
    try {
      return await this.tblExamenGeneral.find({
        where: { activo: true },
        select: [
          'id',
          'Peso',
          'Talla',
          'IndiceMasaCorporal',
          'Piel',
          'AnexosCabello',
          'AnexosUnias',
          'PresionArterial',
          'FrecuenciaRespiratoria',
          'Pulso',
          'Temperatura',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerExamenesGeneralesEliminados() {
    try {
      return await this.tblExamenGeneral.find({
        where: { activo: false },
        withDeleted: true,
        select: [
          'id',
          'Peso',
          'Talla',
          'IndiceMasaCorporal',
          'Piel',
          'AnexosCabello',
          'AnexosUnias',
          'PresionArterial',
          'FrecuenciaRespiratoria',
          'Pulso',
          'Temperatura',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarExamenGeneralPorId(id: number) {
    try {
      const examenGeneral = await this.tblExamenGeneral.findOneOrFail({
        where: { id, activo: true },
      });

      if (!examenGeneral) throw new NotFoundException('No se encontró el examen general');

      delete examenGeneral.deletedAt;
      delete examenGeneral.activo;

      return examenGeneral;
    } catch (error) {
      throw error;
    }
  }

  async actualizarExamenGeneral(id: number, updateExamenGeneralDto: UpdateExamenGeneralDto) {
    try {
      const examenGeneral = await this.tblExamenGeneral.preload({
        id,
        ...updateExamenGeneralDto,
      });

      if (!examenGeneral) throw new NotFoundException('No se encontró el examen general');

      await this.tblExamenGeneral.save(examenGeneral);

      delete examenGeneral.deletedAt;
      delete examenGeneral.activo;

      return examenGeneral;
    } catch (error) {
      throw error;
    }
  }

  async eliminarExamenGeneral(id: number) {
    try {
      const examenGeneral = await this.buscarExamenGeneralPorId(id);
      await this.tblExamenGeneral.softRemove(examenGeneral);

      return {
        message: 'Examen general eliminado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarExamenGeneral(id: number) {
    try {
      const examenGeneral = await this.tblExamenGeneral.findOne({
        where: { id, activo: false },
        withDeleted: true,
      });

      if (!examenGeneral) throw new NotFoundException('No se encontró el examen general');

      await this.tblExamenGeneral.recover(examenGeneral);

      return {
        message: 'Examen general restaurado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }
}
