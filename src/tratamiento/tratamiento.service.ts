import { Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TratamientoService {

  constructor(@InjectRepository(Tratamiento) private readonly tratamientoRepository: Repository<Tratamiento>){}

  async create(createTratamientoDto: CreateTratamientoDto) {
    const tratamiento = this.tratamientoRepository.create(createTratamientoDto);
    return await this.tratamientoRepository.save(tratamiento);
  }

  async findAll() {
    return await this.tratamientoRepository.find();
  }

  async findOne(tratamiento_id: number) {
    return await this.tratamientoRepository.findOneBy({tratamiento_id});
  }

  async update(tratamiento_id: number, updateTratamientoDto: UpdateTratamientoDto) {
    return await this.tratamientoRepository.update({tratamiento_id}, updateTratamientoDto );
  }

  async remove(tratamiento_id: number) {
    return await this.tratamientoRepository.delete({tratamiento_id});
  }
}
