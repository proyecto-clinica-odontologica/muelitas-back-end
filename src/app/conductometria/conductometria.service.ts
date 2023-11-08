import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endodoncia } from '../endodoncia/entities/endodoncia.entity';
import { CreateConductometriaDto } from './dto/create-conductometria.dto';
import { UpdateConductometriaDto } from './dto/update-conductometria.dto';
import { Conductometria } from './entities/conductometria.entity';

@Injectable()
export class ConductometriaService {
  constructor(
    @InjectRepository(Conductometria)
    private readonly tblConductometria: Repository<Conductometria>,

    @InjectRepository(Endodoncia)
    private readonly tblEndodoncia: Repository<Endodoncia>,
  ) {}

  async create(createConductometriaDto: CreateConductometriaDto) {
    try {
      const endodoncia = await this.tblEndodoncia.findOne({
        where: { id: createConductometriaDto.EndodonciaId },
      });

      if (!endodoncia) {
        throw new NotFoundException('No se encontro la endodoncia');
      }

      const conductometria = this.tblConductometria.create({
        ...createConductometriaDto,
        endodoncia: endodoncia,
      });

      await this.tblConductometria.save(conductometria);

      return this.omitirCampos(conductometria);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const conductometrias = await this.tblConductometria.find({
        relations: ['endodoncia'],
      });
      return this.camposVisibles(conductometrias);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const conductometrias = await this.tblConductometria.find({
        relations: ['endodoncia'],
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(conductometrias);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const conductometria = await this.tblConductometria.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!conductometria) {
        throw new NotFoundException('No se encontro la conductometria');
      }

      if (conductometria.deletedAt && !checkDeleted) {
        throw new BadRequestException('La conductometria fue eliminado anteriormente');
      }

      if (!conductometria.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar una conductometria que no ha sido eliminado');
      }

      return this.omitirCampos(conductometria);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateConductometriaDto: UpdateConductometriaDto) {
    try {
      const conductometria = await this.tblConductometria.preload({
        id,
        ...updateConductometriaDto,
      });

      if (!conductometria) {
        throw new NotFoundException('No se encontro la conductometria');
      }

      await this.tblConductometria.save(conductometria);

      return this.omitirCampos(conductometria);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const conductometria = await this.findOneById(id);
      await this.tblConductometria.update(conductometria.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'La conductometria fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const conductometria = await this.findOneById(id, true);
      await this.tblConductometria.update(conductometria.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'La conductometria fue restaurado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(conductometria: Conductometria) {
    delete conductometria?.activo;
    delete conductometria?.deletedAt;
    delete conductometria?.endodoncia?.activo;
    delete conductometria?.endodoncia?.deletedAt;

    return conductometria;
  }

  private camposVisibles(conductometrias: Conductometria[]) {
    return conductometrias.map((conductometria) => this.omitirCampos(conductometria));
  }
}
