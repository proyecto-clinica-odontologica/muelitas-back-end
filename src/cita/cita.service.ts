import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Tratamiento } from 'src/tratamiento/entities/tratamiento.entity';
import { Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita) private readonly citaRepository: Repository<Cita>,
    @InjectRepository(Tratamiento)
    private readonly tratamientoRepository: Repository<Tratamiento>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async create(createCitaDto: CreateCitaDto) {
    const tratamiento = await this.tratamientoRepository.findOneBy({
      id: createCitaDto.IdTratamiento,
    });
    const estudiante = await this.estudianteRepository.findOneBy({
      id: createCitaDto.IdEstudiante,
    });
    if (!tratamiento) {
      throw new BadRequestException('Tratamiento no encontrado');
    }
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    return await this.citaRepository.save({
      ...createCitaDto,
      tratamiento: tratamiento,
      estudiante: estudiante,
    });
  }

  async findAll() {
    return await this.citaRepository.find();
  }

  async findOne(id: number) {
    return await this.citaRepository.findOneBy({ id });
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citaRepository.preload({
      id,
      ...updateCitaDto,
    });

    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }

    return await this.citaRepository.save(cita);
  }

  async remove(id: number) {
    await this.citaRepository.delete({ id });
    return { message: 'Cita eliminada correctamente' };
  }
}
