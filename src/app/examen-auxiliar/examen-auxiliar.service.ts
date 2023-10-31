import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateExamenAuxiliarDto } from './dto/create-examen-auxiliar.dto';
import { UpdateExamenAuxiliarDto } from './dto/update-examen-auxiliar.dto';
import { ExamenAuxiliar } from './entities/examen-auxiliar.entity';

@Injectable()
export class ExamenAuxiliarService {
  constructor(
    @InjectRepository(ExamenAuxiliar)
    private readonly tblExamenAuxiliar: Repository<ExamenAuxiliar>,

    @InjectRepository(Paciente)
    private readonly tblPaciente: Repository<Paciente>,
  ) {}

  async crearExamenAuxiliar(createExamenAuxiliarDto: CreateExamenAuxiliarDto) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id: createExamenAuxiliarDto.PacienteId },
      });

      if (!paciente) {
        throw new NotFoundException(`No existe el paciente con id: ${createExamenAuxiliarDto.PacienteId}`);
      }

      const examenAuxiliar = this.tblExamenAuxiliar.create({
        ...createExamenAuxiliarDto,
        paciente: paciente,
      });

      await this.tblExamenAuxiliar.save(examenAuxiliar);

      return this.omitirCampos(examenAuxiliar);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el examen auxiliar');
    }
  }

  async obtenerExamenesAuxiliares() {
    try {
      return await this.tblExamenAuxiliar.find({
        where: { activo: true },
        select: ['id', 'Contenido', 'FechaRegistro'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los exámenes auxiliares');
    }
  }

  async obtenerExamenesAuxiliaresEliminados() {
    try {
      return await this.tblExamenAuxiliar.find({
        where: { activo: false },
        select: ['id', 'Contenido', 'FechaRegistro'],
        withDeleted: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los exámenes auxiliares');
    }
  }

  async buscarExamenAuxiliarPorId(id: number, checkDeleted: boolean = false) {
    try {
      const examenAuxiliar = await this.tblExamenAuxiliar.findOne({
        where: { id },
        select: ['id', 'Contenido', 'FechaRegistro'],
        withDeleted: true,
      });

      if (!examenAuxiliar) {
        throw new NotFoundException('No se encontró el examen auxiliar');
      }

      if (checkDeleted && !examenAuxiliar.deletedAt) {
        throw new NotFoundException('El examen auxiliar no fue eliminado');
      }

      if (!checkDeleted && examenAuxiliar.deletedAt) {
        throw new NotFoundException('Ya fue eliminado el examen auxiliar');
      }

      return this.omitirCampos(examenAuxiliar);
    } catch (error) {
      throw error;
    }
  }

  async actualizarExamenAuxiliar(id: number, updateExamenAuxiliarDto: UpdateExamenAuxiliarDto) {
    try {
      const examenAuxiliar = await this.tblExamenAuxiliar.preload({
        id,
        ...updateExamenAuxiliarDto,
      });

      if (!examenAuxiliar) throw new NotFoundException('No se encontró el examen general');

      await this.tblExamenAuxiliar.save(examenAuxiliar);

      return this.omitirCampos(examenAuxiliar);
    } catch (error) {
      throw error;
    }
  }

  async eliminarExamenAuxiliar(id: number) {
    try {
      const examenAuxiliar = await this.buscarExamenAuxiliarPorId(id);
      await this.tblExamenAuxiliar.update(examenAuxiliar.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'Examen auxiliar fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarExamenAuxiliar(id: number) {
    try {
      const examenAuxiliar = await this.buscarExamenAuxiliarPorId(id, true);
      await this.tblExamenAuxiliar.update(examenAuxiliar.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'Examen auxiliar restaurado correctamente' };
    } catch (error) {
      throw new NotFoundException('No se encontró el examen auxiliar');
    }
  }

  private omitirCampos(entidad: Partial<ExamenAuxiliar>): Partial<ExamenAuxiliar> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
