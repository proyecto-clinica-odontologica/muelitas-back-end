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
    private tblPaciente: Repository<Paciente>,
  ) {}

  async registrarPaciente(createPacienteDto: CreatePacienteDto) {
    try {
      const paciente = this.tblPaciente.create(createPacienteDto);
      await this.tblPaciente.save(paciente);
      return this.omitirCampos(paciente);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPacientes() {
    try {
      const pacientes = await this.tblPaciente.find({
        where: { activo: true },
      });

      return this.camposVisibles(pacientes);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPacientesEliminados() {
    try {
      const pacientes = await this.tblPaciente.find({
        where: { activo: false },
        withDeleted: true,
      });

      return this.camposVisibles(pacientes);
    } catch (error) {
      throw error;
    }
  }

  async buscarPacientePorId(id: number, checkDeleted: boolean = false) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!paciente) {
        throw new NotFoundException(`no existe un paciente con el id ${id} en la base de datos`);
      }

      if (!checkDeleted && paciente.deletedAt) {
        throw new NotFoundException(`el paciente con el id ${id} esta eliminado`);
      }

      if (checkDeleted && !paciente.deletedAt) {
        throw new NotFoundException(`el paciente no esta eliminado`);
      }

      return this.omitirCampos(paciente);
    } catch (error) {
      throw error;
    }
  }

  async actualizarPaciente(id: number, updatePacienteDto: UpdatePacienteDto) {
    try {
      const paciente = await this.tblPaciente.preload({
        id,
        ...updatePacienteDto,
      });

      if (!paciente) {
        throw new NotFoundException(`no existe el paciente`);
      }

      await this.tblPaciente.save(paciente);
      return this.omitirCampos(paciente);
    } catch (error) {
      throw error;
    }
  }

  async eliminarPaciente(id: number) {
    try {
      const paciente = await this.buscarPacientePorId(id);
      await this.tblPaciente.update(paciente.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return {
        message: `Paciente con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarPaciente(id: number) {
    try {
      const paciente = await this.buscarPacientePorId(id, true);
      await this.tblPaciente.update(paciente.id, {
        activo: true,
        deletedAt: null,
      });

      return {
        message: `Paciente con el id ${id} fue restaurado`,
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(paciente: Paciente) {
    const { activo, deletedAt, ...resto } = paciente;
    return resto;
  }

  private camposVisibles(pacientes: Paciente[]) {
    return pacientes.map((paciente) => this.omitirCampos(paciente));
  }
}
