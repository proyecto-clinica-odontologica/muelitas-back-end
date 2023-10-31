import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotaEvolutivaDto } from './dto/create-nota-evolutiva.dto';
import { UpdateNotaEvolutivaDto } from './dto/update-nota-evolutiva.dto';
import { NotaEvolutiva } from './entities/nota-evolutiva.entity';

@Injectable()
export class NotaEvolutivaService {
  constructor(
    @InjectRepository(NotaEvolutiva)
    private readonly tblNota: Repository<NotaEvolutiva>,
  ) {}

  async registrarNotaEvolutiva(createNotaEvolutivaDto: CreateNotaEvolutivaDto) {
    try {
      const nota = this.tblNota.create(createNotaEvolutivaDto);
      await this.tblNota.save(nota);
      return this.omitirCampos(nota);
    } catch (error) {
      throw error;
    }
  }

  async obtenerNotasEvolutivas() {
    try {
      const notas = await this.tblNota.find({
        where: { activo: true },
      });

      return this.camposVisibles(notas);
    } catch (error) {
      throw error;
    }
  }

  async obtenerNotasEvolutivasEliminadas() {
    try {
      const notas = await this.tblNota.find({
        where: { activo: false },
        withDeleted: true,
      });

      return this.camposVisibles(notas);
    } catch (error) {
      throw error;
    }
  }

  async buscarNotaEvolutivaPorId(id: number, checkDeleted: boolean = false) {
    try {
      const notaEvolutiva = await this.tblNota.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!notaEvolutiva) {
        throw new NotFoundException(`No existe la nota evolutiva`);
      }

      if (!checkDeleted && notaEvolutiva.deletedAt) {
        throw new NotFoundException(`La nota evolutiva ya fue eliminada`);
      }

      if (checkDeleted && !notaEvolutiva.deletedAt) {
        throw new NotFoundException(`La nota evolutiva no fue eliminada`);
      }

      return this.omitirCampos(notaEvolutiva);
    } catch (error) {
      throw error;
    }
  }

  async actualizarNotaEvolutiva(id: number, updateNotaEvolutivaDto: UpdateNotaEvolutivaDto) {
    try {
      const notaEvolutiva = await this.tblNota.preload({
        id,
        ...updateNotaEvolutivaDto,
      });

      if (!notaEvolutiva) {
        throw new NotFoundException(`No existe la nota evolutiva`);
      }

      await this.tblNota.save(notaEvolutiva);
      return this.omitirCampos(notaEvolutiva);
    } catch (error) {
      throw error;
    }
  }

  async eliminarNotaEvolutiva(id: number) {
    try {
      const notaEvolutiva = await this.buscarNotaEvolutivaPorId(id);
      await this.tblNota.update(notaEvolutiva.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: `La nota evolutiva fue eliminada correctamente` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarNotaEvolutiva(id: number) {
    try {
      const notaEvolutiva = await this.buscarNotaEvolutivaPorId(id, true);
      await this.tblNota.update(notaEvolutiva.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: `La nota evolutiva fue restaurada correctamente` };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(notaEvolutiva: NotaEvolutiva) {
    const { activo, deletedAt, ...resto } = notaEvolutiva;
    return resto;
  }

  private camposVisibles(notasEvolutivas: NotaEvolutiva[]) {
    return notasEvolutivas.map((notaEvolutiva) => this.omitirCampos(notaEvolutiva));
  }
}
