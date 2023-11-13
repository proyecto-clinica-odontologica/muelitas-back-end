import { Injectable } from '@nestjs/common';
import { CreateRadiografiaEndodonciaDto } from './dto/create-radiografia-endodoncia.dto';
import { UpdateRadiografiaEndodonciaDto } from './dto/update-radiografia-endodoncia.dto';
import { RadiografiaEndodoncia } from './entities/radiografia-endodoncia.entity';
import { Endodoncia } from 'src/endodoncia/entities/endodoncia.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';


@Injectable()
export class RadiografiaEndodonciaService {
  constructor(
    @InjectRepository(RadiografiaEndodoncia)
    private readonly dbRadiografia: Repository<RadiografiaEndodoncia>,

    // private  dbEndodoncia: EndodonciaService,
  ) { }

  async create(EndodonciaId: number, createRadiografiaEndodonciaDto: CreateRadiografiaEndodonciaDto) {
    try {
      // const Endodoncia = await this.dbEndodoncia.findOne(EndodonciaId);
      const RadiografiaEndodoncia = this.dbRadiografia.create(createRadiografiaEndodonciaDto);
      // RadiografiaEndodoncia.Endodoncia = Endodoncia;
      return await this.dbRadiografia.save(RadiografiaEndodoncia);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbRadiografia.find({ relations: ['Endodoncia'] });
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: number) {
    let radiografiaEndodoncia: RadiografiaEndodoncia;
    try {
      if (isNaN(+id)) {
        radiografiaEndodoncia = await this.dbRadiografia.findOneBy({ RadiografiaEndodonciaId: +id });
      }

      if (!radiografiaEndodoncia) {
        throw new NotFoundException(
          `no existe una radigrafia Endodoncia con el id ${id} en la base de datos`,
        );
      }

      return radiografiaEndodoncia;
    } catch (error) {
      throw error;
    }
  }

  async update(RadiografiaEndodonciaId: number, updateRadiografiaEndodonciaDto: UpdateRadiografiaEndodonciaDto) {
    try {
      const radiografiaEndodoncia = await this.dbRadiografia.preload({
        RadiografiaEndodonciaId,
        ...updateRadiografiaEndodonciaDto,
      });
      if (!radiografiaEndodoncia) {
        throw new BadRequestException('No existe el docente que desea actualizar');
      }
      return await this.dbRadiografia.save(radiografiaEndodoncia);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const radiografiaEndodoncia = await this.findOne(id);
      await this.dbRadiografia.remove(radiografiaEndodoncia);
      return {
        message: `la radigrafia Endodoncia con el id ${id} fue eliminado`,
      };
    } catch (error) { 
      throw error;
    }
  }
}
