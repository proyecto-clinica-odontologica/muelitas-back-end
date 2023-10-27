import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarasdienteDto } from './dto/create-carasdiente.dto';
import { UpdateCarasdienteDto } from './dto/update-carasdiente.dto';
import { Carasdiente } from './entities/carasdiente.entity';

@Injectable()
export class CarasdientesService {
  constructor(
    @InjectRepository(Carasdiente)
    private readonly dbCarasDiente: Repository<Carasdiente>,
  ) {}
  async create(createCarasdienteDto: CreateCarasdienteDto) {
    try {
      const carasDiente = this.dbCarasDiente.create(createCarasdienteDto);
      return await this.dbCarasDiente.save(carasDiente);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbCarasDiente.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const carasDiente = await this.dbCarasDiente.findOne({
        where: { id },
      });

      if (!carasDiente) throw new NotFoundException('El mapeo no existe');

      return carasDiente;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCarasdienteDto: UpdateCarasdienteDto) {
    try {
      const carasDiente = await this.dbCarasDiente.preload({
        id,
        ...updateCarasdienteDto,
      });

      if (!carasDiente) throw new NotFoundException('El mapeo no existe');

      return await this.dbCarasDiente.save(carasDiente);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const carasDiente = await this.findOne(id);
      await this.dbCarasDiente.remove(carasDiente);
    } catch (error) {
      throw error;
    }
  }
}
