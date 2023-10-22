import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Repository } from 'typeorm';
import { CreateOdontogramaDto } from './dto/create-odontograma.dto';
import { UpdateOdontogramaDto } from './dto/update-odontograma.dto';
import { Odontograma } from './entities/odontograma.entity';

@Injectable()
export class OdontogramaService {
  constructor(
    @InjectRepository(Odontograma)
    private dbOdontograma: Repository<Odontograma>,

    @InjectRepository(Paciente)
    private readonly dbPaciente: Repository<Paciente>,
  ) {}

  async create(createOdontogramaDto: CreateOdontogramaDto) {
    try {
      const paciente = await this.dbPaciente.findOne({
        where: { id: createOdontogramaDto.IdPaciente },
      });

      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado en la base de datos');
      }
      const odontograma = this.dbOdontograma.create({
        ...createOdontogramaDto,
        paciente,
      });

      await this.dbOdontograma.save(odontograma);
      return odontograma;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbOdontograma.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const odontograma = await this.dbOdontograma.findOneBy({ id });

      if (!odontograma) {
        throw new NotFoundException(`no existe un autor con el id ${id} en la base de datos`);
      }

      return odontograma;
    } catch (error) {
      throw error;
    }
  }

  // TODO: implementar el método update para un odontograma de un paciente
  async update(id: number, updateOdontogramaDto: UpdateOdontogramaDto) {
    try {
      const odontograma = await this.dbOdontograma.preload({
        id,
        ...updateOdontogramaDto,
      });
      await this.dbOdontograma.save(odontograma);
      return odontograma;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const odontograma = await this.findOne(id);
      await this.dbOdontograma.remove(odontograma);
      return {
        message: `autor con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
