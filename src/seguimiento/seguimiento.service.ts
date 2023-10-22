import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from 'src/cita/entities/cita.entity';
import { Repository } from 'typeorm';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';
import { Seguimiento } from './entities/seguimiento.entity';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectRepository(Seguimiento)
    private readonly seguimientoRepository: Repository<Seguimiento>,

    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async create(createSeguimientoDto: CreateSeguimientoDto) {
    const cita = await this.citaRepository.findOneBy({
      id: createSeguimientoDto.IdCita,
    });

    if (!cita) {
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

  async findOne(id: number) {
    return await this.seguimientoRepository.findOneBy({ id });
  }

  async update(id: number, updateSeguimientoDto: UpdateSeguimientoDto) {
    return await this.seguimientoRepository.update(
      { id },
      updateSeguimientoDto,
    );
  }

  async remove(id: number) {
    await this.seguimientoRepository.delete(id);
    return { message: 'Seguimiento eliminado correctamente' };
  }
}
