import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOclusionDto } from './dto/create-oclusion.dto';
import { UpdateOclusionDto } from './dto/update-oclusion.dto';
import { Oclusion } from './entities/oclusion.entity';

@Injectable()
export class OclusionService {
  constructor(
    @InjectRepository(Oclusion)
    private readonly tblOclusion: Repository<Oclusion>,
  ) {}

  async registrarOclusion(createOclusionDto: CreateOclusionDto) {
    try {
      const oclusion = this.tblOclusion.create(createOclusionDto);
      await this.tblOclusion.save(oclusion);

      return this.omitirCampos(oclusion);
    } catch (error) {
      throw error;
    }
  }

  async obtenerOclusiones() {
    try {
      return await this.tblOclusion.find({
        where: { activo: true },
        select: [
          'id',
          'RelacionMolarDerecha',
          'RelacionMolarIzquierda',
          'RelacionCaninaDerecha',
          'RelacionCaninaIzquierda',
          'GradoDeApertura',
          'OverBite',
          'OverJet',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerOclusionesEliminadas() {
    try {
      return await this.tblOclusion.find({
        where: { activo: false },
        select: [
          'id',
          'RelacionMolarDerecha',
          'RelacionMolarIzquierda',
          'RelacionCaninaDerecha',
          'RelacionCaninaIzquierda',
          'GradoDeApertura',
          'OverBite',
          'OverJet',
        ],
        withDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarOclusionPorId(id: number, checkDeleted: boolean = false) {
    try {
      const oclusion = await this.tblOclusion.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!oclusion) {
        throw new NotFoundException('No se encontró la oclusión');
      }

      if (!checkDeleted && oclusion.deletedAt) {
        throw new NotFoundException('La oclusión ya fue eliminada');
      }

      if (checkDeleted && !oclusion.deletedAt) {
        throw new NotFoundException('La oclusión no está eliminada');
      }

      return this.omitirCampos(oclusion);
    } catch (error) {
      throw error;
    }
  }

  async actualizarOclusion(id: number, updateOclusionDto: UpdateOclusionDto) {
    try {
      const oclusion = await this.tblOclusion.preload({
        id,
        ...updateOclusionDto,
      });

      if (!oclusion) {
        throw new NotFoundException('No se encontró la oclusión');
      }

      await this.tblOclusion.save(oclusion);

      return this.omitirCampos(oclusion);
    } catch (error) {
      throw error;
    }
  }

  async eliminarOclusion(id: number) {
    try {
      const oclusion = await this.buscarOclusionPorId(id);
      await this.tblOclusion.update(oclusion.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'Oclusión eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarOclusion(id: number) {
    try {
      const oclusion = await this.buscarOclusionPorId(id, true);
      await this.tblOclusion.update(oclusion.id, { activo: true, deletedAt: null });

      return { message: 'Oclusión restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: Partial<Oclusion>): Partial<Oclusion> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
