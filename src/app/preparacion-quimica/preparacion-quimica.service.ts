import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endodoncia } from '../endodoncia/entities/endodoncia.entity';
import { CreatePreparacionQuimicaDto } from './dto/create-preparacion-quimica.dto';
import { UpdatePreparacionQuimicaDto } from './dto/update-preparacion-quimica.dto';
import { PreparacionQuimica } from './entities/preparacion-quimica.entity';

@Injectable()
export class PreparacionQuimicaService {
  constructor(
    @InjectRepository(PreparacionQuimica)
    private readonly tblPreparacionQuimica: Repository<PreparacionQuimica>,

    @InjectRepository(Endodoncia)
    private readonly tblEndodoncia: Repository<Endodoncia>,
  ) {}

  async registrarPreparacionQuimica(createPreparacionQuimicaDto: CreatePreparacionQuimicaDto) {
    try {
      const endodoncia = await this.tblEndodoncia.findOne({
        where: { id: createPreparacionQuimicaDto.EndodonciaId },
      });

      if (!endodoncia) {
        throw new NotFoundException('No existe la endodoncia');
      }

      const preparacionQuimica = this.tblPreparacionQuimica.create({
        ...createPreparacionQuimicaDto,
        endodoncia: endodoncia,
      });

      await this.tblPreparacionQuimica.save(preparacionQuimica);

      return this.omitirCampos(preparacionQuimica);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPreparacionesQuimicas() {
    try {
      const preparacionesQuimicas = await this.tblPreparacionQuimica.find({
        relations: ['endodoncia'],
      });

      return this.camposVisibles(preparacionesQuimicas);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPreparacionesQuimicasEliminadas() {
    try {
      const preparacionesQuimicas = await this.tblPreparacionQuimica.find({
        withDeleted: true,
        where: { activo: false },
        relations: ['endodoncia'],
      });

      return this.camposVisibles(preparacionesQuimicas);
    } catch (error) {
      throw error;
    }
  }

  async buscarPreparacionQuimicaPorId(id: number, checkDeleted: boolean = false) {
    try {
      const preparacionQuimica = await this.tblPreparacionQuimica.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!preparacionQuimica) {
        throw new NotFoundException('No existe la preparacion quimica');
      }

      if (preparacionQuimica.deletedAt && !checkDeleted) {
        throw new BadRequestException('La preparacion quimica fue eliminado anteriormente');
      }

      if (!preparacionQuimica.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar una preparacion quimica que no ha sido eliminado');
      }

      return this.omitirCampos(preparacionQuimica);
    } catch (error) {
      throw error;
    }
  }

  async actualizarPreparacionQuimica(id: number, updatePreparacionQuimicaDto: UpdatePreparacionQuimicaDto) {
    try {
      const preparacionQuimica = await this.tblPreparacionQuimica.preload({
        id,
        ...updatePreparacionQuimicaDto,
      });

      if (!preparacionQuimica) {
        throw new NotFoundException('No existe la preparacion quimica');
      }

      await this.tblPreparacionQuimica.save(preparacionQuimica);

      return this.omitirCampos(preparacionQuimica);
    } catch (error) {
      throw error;
    }
  }

  async eliminarPreparacionQuimica(id: number) {
    try {
      const preparacionQuimica = await this.buscarPreparacionQuimicaPorId(id);
      await this.tblPreparacionQuimica.update(preparacionQuimica.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'Preparacion quimica eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarPreparacionQuimica(id: number) {
    try {
      const preparacionQuimica = await this.buscarPreparacionQuimicaPorId(id, true);
      await this.tblPreparacionQuimica.update(preparacionQuimica.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'Preparacion quimica restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(preparacionQuimica: PreparacionQuimica) {
    delete preparacionQuimica?.activo;
    delete preparacionQuimica?.deletedAt;
    delete preparacionQuimica?.endodoncia?.activo;
    delete preparacionQuimica?.endodoncia?.deletedAt;

    return preparacionQuimica;
  }

  private camposVisibles(preparacionesQuimicas: PreparacionQuimica[]) {
    return preparacionesQuimicas.map((preparacionQuimica) => this.omitirCampos(preparacionQuimica));
  }
}
