import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private dbPaciente: Repository<Paciente>,
  ) {}
  async create(createPacienteDto: CreatePacienteDto) {
    try {
      const Paciente = this.dbPaciente.create(createPacienteDto);
      await this.dbPaciente.save(Paciente);
      return Paciente;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbPaciente.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    let Paciente: Paciente;
    try {
      if (isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ Nombre: id });
      } else if (isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ ApellidoPaterno: id });
      } else if (isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ ApellidoMaterno: id });
      } else if (isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ NumeroDocumento: id });
      } else {
        Paciente = await this.dbPaciente.findOneBy({ id: +id });
      }

      if (!Paciente) {
        throw new NotFoundException(`no existe un paciente con el id ${id} en la base de datos`);
      }

      return Paciente;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    try {
      const Paciente = await this.dbPaciente.preload({
        id: id,
        ...updatePacienteDto,
      });
      await this.dbPaciente.save(Paciente);
      return Paciente;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const Paciente = await this.findOne(id);
      await this.dbPaciente.remove(Paciente);
      return {
        message: `Paciente con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
