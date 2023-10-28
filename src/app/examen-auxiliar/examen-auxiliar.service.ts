import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenAuxiliarDto } from './dto/create-examen-auxiliar.dto';
import { UpdateExamenAuxiliarDto } from './dto/update-examen-auxiliar.dto';
import { ExamenAuxiliar } from './entities/examen-auxiliar.entity';

@Injectable()
export class ExamenAuxiliarService {
  constructor(
    @InjectRepository(ExamenAuxiliar)
    private readonly tblExamenAuxiliar: Repository<ExamenAuxiliar>,
  ) {}

  async crearExamenAuxiliar(createExamenAuxiliarDto: CreateExamenAuxiliarDto) {
    try {
      const examenAuxiliar = this.tblExamenAuxiliar.create(createExamenAuxiliarDto);
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

  async buscarExamenAuxiliarPorId(id: number) {
    try {
      const examenAuxiliar = await this.tblExamenAuxiliar.findOneOrFail({
        where: { id, activo: true },
        select: ['id', 'Contenido', 'FechaRegistro'],
      });

      return examenAuxiliar;
    } catch (error) {
      throw new NotFoundException('No se encontró el examen general');
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
      await this.tblExamenAuxiliar.softRemove(examenAuxiliar);
      return { message: 'Examen auxiliar fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarExamenAuxiliar(id: number) {
    try {
      const examenAuxiliar = await this.tblExamenAuxiliar.findOneOrFail({
        where: { id, activo: false },
        withDeleted: true,
      });

      await this.tblExamenAuxiliar.recover(examenAuxiliar);

      examenAuxiliar.activo = true;

      return await this.tblExamenAuxiliar.save(examenAuxiliar);
    } catch (error) {
      throw new NotFoundException('No se encontró el examen auxiliar');
    }
  }

  private omitirCampos(entidad: Partial<ExamenAuxiliar>): Partial<ExamenAuxiliar> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
