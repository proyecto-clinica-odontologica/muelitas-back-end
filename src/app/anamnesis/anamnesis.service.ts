import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';
import { Anamnesis } from './entities/anamnesis.entity';

@Injectable()
export class AnamnesisService {
  constructor(
    @InjectRepository(Anamnesis)
    private readonly tblAnamnesis: Repository<Anamnesis>,
  ) {}

  async crearAnamnesis(createAnamnesisDto: CreateAnamnesisDto) {
    try {
      const anamnesis = this.tblAnamnesis.create(createAnamnesisDto);
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

  async buscarAnamnesisPorId(id: number) {
    try {
      const anamnesis = await this.tblAnamnesis.findOneOrFail({
        where: { id, activo: true },
        select: ['id', 'Contenido', 'FechaRegistro'],
      });

      return anamnesis;
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
      await this.tblAnamnesis.softRemove(anamnesis);
      return { message: 'La anamnesis fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarAnamnesis(id: number) {
    try {
      const examenAuxiliar = await this.tblAnamnesis.findOneOrFail({
        where: { id, activo: false },
        withDeleted: true,
      });

      await this.tblAnamnesis.recover(examenAuxiliar);

      examenAuxiliar.activo = true;

      return await this.tblAnamnesis.save(examenAuxiliar);
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: Partial<Anamnesis>): Partial<Anamnesis> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
