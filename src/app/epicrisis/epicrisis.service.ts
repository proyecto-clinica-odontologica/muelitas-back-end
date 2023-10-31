import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpicrisisDto } from './dto/create-epicrisis.dto';
import { UpdateEpicrisisDto } from './dto/update-epicrisis.dto';
import { Epicrisis } from './entities/epicrisis.entity';

@Injectable()
export class EpicrisisService {
  constructor(
    @InjectRepository(Epicrisis)
    private readonly tblEpicrisis: Repository<Epicrisis>,
  ) {}
  async registrarEpicrisis(createEpicrisisDto: CreateEpicrisisDto) {
    try {
      const epicrisis = this.tblEpicrisis.create(createEpicrisisDto);
      await this.tblEpicrisis.save(epicrisis);
      return this.omitirCampos(epicrisis);
    } catch (error) {
      throw error;
    }
  }

  async obtenerEpicrisis() {
    try {
      const epicrisis = await this.tblEpicrisis.find({
        where: { activo: true },
      });
      return this.camposVisibles(epicrisis);
    } catch (error) {
      throw error;
    }
  }

  async obtenerEpicrisisEliminadas() {
    try {
      const epicrisis = await this.tblEpicrisis.find({
        where: { activo: false },
        withDeleted: true,
      });
      return this.camposVisibles(epicrisis);
    } catch (error) {
      throw error;
    }
  }

  async buscarEpicrisisPorId(id: number, checkDeleted: boolean = false) {
    try {
      const epicrisis = await this.tblEpicrisis.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!epicrisis) {
        throw new NotFoundException(`No existe la epicrisis`);
      }

      if (!checkDeleted && epicrisis.deletedAt) {
        throw new NotFoundException(`La epicrisis está eliminada`);
      }

      if (checkDeleted && !epicrisis.deletedAt) {
        throw new NotFoundException(`La epicrisis está eliminada`);
      }

      return this.omitirCampos(epicrisis);
    } catch (error) {
      throw error;
    }
  }

  async actualizarEpicrisis(id: number, updateEpicrisisDto: UpdateEpicrisisDto) {
    try {
      const epicrisis = await this.tblEpicrisis.preload({
        id,
        ...updateEpicrisisDto,
      });

      if (!epicrisis) {
        throw new NotFoundException(`No existe la epicrisis`);
      }

      await this.tblEpicrisis.save(epicrisis);
      return this.omitirCampos(epicrisis);
    } catch (error) {
      throw error;
    }
  }

  async eliminarEpicrisis(id: number) {
    try {
      const epicrisis = await this.buscarEpicrisisPorId(id);
      await this.tblEpicrisis.update(epicrisis.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: `Epicrisis eliminada correctamente` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarEpicrisis(id: number) {
    try {
      const epicrisis = await this.buscarEpicrisisPorId(id, true);
      await this.tblEpicrisis.update(epicrisis.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: `Epicrisis restaurada correctamente` };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(epicris: Epicrisis) {
    const { activo, deletedAt, ...resto } = epicris;
    return resto;
  }

  private camposVisibles(epicrisis: Epicrisis[]) {
    return epicrisis.map((epicris) => this.omitirCampos(epicris));
  }
}
