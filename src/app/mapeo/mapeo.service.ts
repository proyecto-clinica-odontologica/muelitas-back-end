import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMapeoDto } from './dto/create-mapeo.dto';
import { UpdateMapeoDto } from './dto/update-mapeo.dto';
import { Mapeo } from './entities/mapeo.entity';

@Injectable()
export class MapeoService {
  constructor(
    @InjectRepository(Mapeo)
    private readonly dbMapeo: Repository<Mapeo>,
  ) {}
  async create(createMapeoDto: CreateMapeoDto) {
    try {
      const mapeo = this.dbMapeo.create(createMapeoDto);
      return await this.dbMapeo.save(mapeo);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbMapeo.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const mapeo = await this.dbMapeo.findOne({
        where: { id },
      });

      if (!mapeo) throw new NotFoundException('El mapeo no existe');

      return mapeo;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateMapeoDto: UpdateMapeoDto) {
    try {
      const mapeo = await this.dbMapeo.preload({
        id,
        ...updateMapeoDto,
      });

      if (!mapeo) throw new NotFoundException('El mapeo no existe');

      return await this.dbMapeo.save(mapeo);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const mapeo = await this.findOne(id);

      return await this.dbMapeo.remove(mapeo);
    } catch (error) {
      throw error;
    }
  }
}
