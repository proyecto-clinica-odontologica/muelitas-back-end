import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenEstomatologicoDto } from './dto/create-examen-estomatologico.dto';
import { UpdateExamenEstomatologicoDto } from './dto/update-examen-estomatologico.dto';
import { ExamenEstomatologico } from './entities/examen-estomatologico.entity';

@Injectable()
export class ExamenEstomatologicoService {
  constructor(
    @InjectRepository(ExamenEstomatologico)
    private readonly tblExEstomatologico: Repository<ExamenEstomatologico>,
  ) {}

  async registrarExamenEstomatologico(createExamenEstomatologicoDto: CreateExamenEstomatologicoDto) {
    try {
      const examen = this.tblExEstomatologico.create(createExamenEstomatologicoDto);
      await this.tblExEstomatologico.save(examen);
      return this.omitirCampos(examen);
    } catch (error) {
      throw error;
    }
  }

  async obtenerExamenesEstomatologicos() {
    try {
      const examenes = await this.tblExEstomatologico.find({
        where: { activo: true },
      });
      return this.camposVisibles(examenes);
    } catch (error) {
      throw error;
    }
  }

  async obtenerExamenesEstomatologicosEliminados() {
    try {
      const examenes = await this.tblExEstomatologico.find({
        where: { activo: false },
        withDeleted: true,
      });
      return this.camposVisibles(examenes);
    } catch (error) {
      throw error;
    }
  }

  async buscarExamenEstomatologicoPorId(id: number, checkDeleted: boolean = false) {
    try {
      const examen = await this.tblExEstomatologico.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!examen) {
        throw new NotFoundException(`No existe el examen estomatologico `);
      }

      if (!checkDeleted && examen.deletedAt) {
        throw new NotFoundException(`El examen estomatologico ya fue eliminado`);
      }

      if (checkDeleted && !examen.deletedAt) {
        throw new NotFoundException(`El examen estomatologico no fue eliminado`);
      }

      return this.omitirCampos(examen);
    } catch (error) {
      throw error;
    }
  }

  async actualizarExamenEstomatologico(id: number, updateExamenEstomatologicoDto: UpdateExamenEstomatologicoDto) {
    try {
      const examen = await this.tblExEstomatologico.preload({
        id,
        ...updateExamenEstomatologicoDto,
      });

      if (!examen) {
        throw new NotFoundException(`No existe el examen estomatologico`);
      }

      await this.tblExEstomatologico.save(examen);

      return this.omitirCampos(examen);
    } catch (error) {
      throw error;
    }
  }

  async eliminarExamenEstomatologico(id: number) {
    try {
      const examen = await this.buscarExamenEstomatologicoPorId(id);
      await this.tblExEstomatologico.update(examen.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: `El examen estomatologico fue eliminado correctamente` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarExamenEstomatologico(id: number) {
    try {
      const examen = await this.buscarExamenEstomatologicoPorId(id, true);
      await this.tblExEstomatologico.update(examen.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: `El examen estomatologico fue restaurado correctamente` };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(examenEstomatologico: ExamenEstomatologico) {
    const { activo, deletedAt, ...resto } = examenEstomatologico;
    return resto;
  }

  private camposVisibles(examenEstomatologico: ExamenEstomatologico[]) {
    return examenEstomatologico.map((examen) => this.omitirCampos(examen));
  }
}
