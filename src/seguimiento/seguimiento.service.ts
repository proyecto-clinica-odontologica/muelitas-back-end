import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seguimiento } from './entities/seguimiento.entity';
import { Repository } from 'typeorm';
import { Cita } from 'src/cita/entities/cita.entity';

@Injectable()
export class SeguimientoService {

  constructor (
    @InjectRepository (Seguimiento) private readonly seguimientoRepository: Repository<Seguimiento>,
    @InjectRepository (Cita) private readonly citaRepository: Repository<Cita> 

  ){}
  async create(createSeguimientoDto: CreateSeguimientoDto) {
    const cita = await this.citaRepository.findOneBy({cita_id: createSeguimientoDto.cita});

    if(!cita ){
      throw new BadRequestException('Cita no encontrado');
    }
    return await this.seguimientoRepository.save({
    ...createSeguimientoDto,
    cita,

    });
  }

  async findAll() {
    return await this.seguimientoRepository.find();
  }

  async findOne(seguimiento_id: number) {
    return await this.seguimientoRepository.findOneBy({seguimiento_id});
  }

  async update(seguimiento_id: number, updateSeguimientoDto: UpdateSeguimientoDto) {
    return await this.seguimientoRepository.update({seguimiento_id}, updateSeguimientoDto) ;
  }

  async remove(seguimiento_id: number) {
    return await this.seguimientoRepository.delete(seguimiento_id);
  }
}
