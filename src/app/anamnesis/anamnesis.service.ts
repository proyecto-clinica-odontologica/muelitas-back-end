import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';
import { Anamnesis } from './entities/anamnesis.entity';

@Injectable()
export class AnamnesisService {
  constructor(
    @InjectRepository(Anamnesis)
    private readonly tblAnamnesis: Repository<Anamnesis>,

    @InjectRepository(Paciente)
    private readonly tblPaciente: Repository<Paciente>,
  ) {}

  async crearAnamnesis(createAnamnesisDto: CreateAnamnesisDto) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id: createAnamnesisDto.PacienteId },
      });

      if (!paciente) throw new NotFoundException('No se encontró el paciente');

      const anamnesis = this.tblAnamnesis.create({
        ...createAnamnesisDto,
        paciente,
      });

      await this.tblAnamnesis.save(anamnesis);

      return this.omitirCampos(anamnesis);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la anamnesis');
    }
  }

  async obtenerAnamnesis() {
    try {
      return await this.tblAnamnesis.find({
        where: { activo: true },
        select: ['id', 'Contenido', 'FechaRegistro'],
      });
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }

  async obtenerAnamnesisEliminados() {
    try {
      return await this.tblAnamnesis.find({
        where: { activo: false },
        select: ['id', 'Contenido', 'FechaRegistro'],
        withDeleted: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }

  async buscarAnamnesisPorId(id: number, checkDeleted: boolean = false) {
    try {
      const anamnesis = await this.tblAnamnesis.findOne({
        where: { id, activo: true },
        withDeleted: true,
      });

      if (!anamnesis) throw new NotFoundException('No se encontró la anamnesis');

      if (checkDeleted && !anamnesis.deletedAt) {
        throw new NotFoundException('La anamnesis no fue eliminado');
      }

      if (!checkDeleted && anamnesis.deletedAt) {
        throw new NotFoundException('ya fue eliminado la anamnesis');
      }

      return this.omitirCampos(anamnesis);
    } catch (error) {
      throw new NotFoundException('No se encontró la anamnesis');
    }
  }

  async actualizarAnamnesis(id: number, updateAnamnesisDto: UpdateAnamnesisDto) {
    try {
      const anamnesis = await this.tblAnamnesis.preload({
        id,
        ...updateAnamnesisDto,
      });

      if (!anamnesis) throw new NotFoundException('No se encontró la anamnesis');

      await this.tblAnamnesis.save(anamnesis);

      return this.omitirCampos(anamnesis);
    } catch (error) {
      throw error;
    }
  }

  async eliminarAnamnesis(id: number) {
    try {
      const anamnesis = await this.buscarAnamnesisPorId(id);
      await this.tblAnamnesis.update(anamnesis.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'La anamnesis fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarAnamnesis(id: number) {
    try {
      const examenAuxiliar = await this.buscarAnamnesisPorId(id, true);
      await this.tblAnamnesis.update(examenAuxiliar.id, {
        activo: true,
        deletedAt: null,
      });

      return {
        message: 'La anamnesis fue restaurado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: Partial<Anamnesis>): Partial<Anamnesis> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
