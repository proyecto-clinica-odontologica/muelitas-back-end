import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { Tratamiento } from 'src/tratamiento/entities/tratamiento.entity';
import { number } from 'joi';
import { promises } from 'dns';

@Injectable()
export class CitaService {

  constructor(
    @InjectRepository(Cita) private readonly citaRepository: Repository<Cita>,
    @InjectRepository(Tratamiento) private readonly tratamientoRepository: Repository<Tratamiento>

    ){}

  async create(createCitaDto: CreateCitaDto) {
    const tratamiento = await this.tratamientoRepository.findOneBy({tratamiento_nombre: createCitaDto.tratamiento});

    if(!tratamiento ){
      throw new BadRequestException('Tratamiento no encontrado');
    }
    return await this.citaRepository.save({
    ...createCitaDto,
    tratamiento, 
    });

  }

  async findAll() {
    return await this.citaRepository.find();
  }

  async findOne(cita_id: number) {
    return await this.citaRepository.findOneBy({cita_id});
  }

  async update(cita_id: number, updateCitaDto: UpdateCitaDto){
    return await this.citaRepository.update({cita_id}, 
      {paciente_id: updateCitaDto.paciente_id, estudiante_id: updateCitaDto.estudiante_id});
  }

  async remove(cita_id: number) {
    return await this.citaRepository.delete({cita_id});
  }
}
