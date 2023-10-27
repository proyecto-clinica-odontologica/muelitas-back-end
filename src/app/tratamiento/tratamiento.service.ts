import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { Tratamiento } from './entities/tratamiento.entity';

@Injectable()
export class TratamientoService {
  constructor(
    @InjectRepository(Tratamiento)
    private readonly tratamientoRepository: Repository<Tratamiento>,
  ) {}

  async create(createTratamientoDto: CreateTratamientoDto) {
    try {
      const tratamiento =
        this.tratamientoRepository.create(createTratamientoDto);
      return await this.tratamientoRepository.save(tratamiento);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.tratamientoRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.tratamientoRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
    try {
      return await this.tratamientoRepository.update(
        { id },
        updateTratamientoDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.tratamientoRepository.delete({ id });
      return { message: 'Tratamiento eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }
}
