import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateExamenGeneralDto } from './dto/create-examen-general.dto';
import { UpdateExamenGeneralDto } from './dto/update-examen-general.dto';
import { ExamenGeneral } from './entities/examen-general.entity';

@Injectable()
export class ExamenGeneralService {
  constructor(
    @InjectRepository(ExamenGeneral)
    private readonly tblExamenGeneral: Repository<ExamenGeneral>,

    @InjectRepository(Paciente)
    private readonly tblPaciente: Repository<Paciente>,
  ) {}

  async registrarExamenGeneral(createExamenGeneralDto: CreateExamenGeneralDto) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id: createExamenGeneralDto.PacienteId },
      });

      if (!paciente) throw new NotFoundException('No se encontró el paciente');

      const examenGeneral = this.tblExamenGeneral.create({
        ...createExamenGeneralDto,
        paciente: paciente,
      });

      await this.tblExamenGeneral.save(examenGeneral);

      return this.omitirCampos(examenGeneral);
    } catch (error) {
      throw error;
    }
  }

  async obtenerExamenesGenerales() {
    try {
      const examenes = await this.tblExamenGeneral.find({
        where: { activo: true },
      });
      return this.camposVisibles(examenes);
    } catch (error) {
      throw error;
    }
  }

  async obtenerExamenesGeneralesEliminados() {
    try {
      const examenes = await this.tblExamenGeneral.find({
        where: { activo: false },
        withDeleted: true,
      });
      return this.camposVisibles(examenes);
    } catch (error) {
      throw error;
    }
  }

  async buscarExamenGeneralPorId(id: number, checkDeleted: boolean = false) {
    try {
      const examenGeneral = await this.tblExamenGeneral.findOne({
        where: { id, activo: true },
        withDeleted: true,
      });

      if (!examenGeneral) throw new NotFoundException('No se encontró el examen general');

      if (checkDeleted && !examenGeneral.deletedAt) {
        throw new NotFoundException('El examen general no fue eliminado');
      }

      if (!checkDeleted && examenGeneral.deletedAt) {
        throw new NotFoundException('Ya fue eliminado el examen general');
      }

      return this.omitirCampos(examenGeneral);
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

      return this.omitirCampos(examenGeneral);
    } catch (error) {
      throw error;
    }
  }

  async eliminarExamenGeneral(id: number) {
    try {
      const examenGeneral = await this.buscarExamenGeneralPorId(id);
      await this.tblExamenGeneral.update(examenGeneral.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return {
        message: 'Examen general eliminado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarExamenGeneral(id: number) {
    try {
      const examenGeneral = await this.buscarExamenGeneralPorId(id, true);
      await this.tblExamenGeneral.update(examenGeneral.id, {
        activo: true,
        deletedAt: null,
      });

      return {
        message: 'Examen general restaurado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(examenGeneral: ExamenGeneral) {
    const { deletedAt, activo, ...resto } = examenGeneral;
    return resto;
  }

  private camposVisibles(examenesGenerales: ExamenGeneral[]) {
    return examenesGenerales.map((examenGeneral) => this.omitirCampos(examenGeneral));
  }
}
