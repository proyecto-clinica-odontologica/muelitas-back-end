import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateDiagnosticoDefinitivoDto } from './dto/create-diagnostico-definitivo.dto';
import { UpdateDiagnosticoDefinitivoDto } from './dto/update-diagnostico-definitivo.dto';
import { DiagnosticoDefinitivo } from './entities/diagnostico-definitivo.entity';

@Injectable()
export class DiagnosticoDefinitivoService {
  constructor(
    @InjectRepository(DiagnosticoDefinitivo)
    private readonly tblDiagnosticoDefinitivo: Repository<DiagnosticoDefinitivo>,

    @InjectRepository(Paciente)
    private readonly tblPaciente: Repository<Paciente>,
  ) {}

  async crearDiagnosticoDefinitivo(createDiagnosticoDefinitivoDto: CreateDiagnosticoDefinitivoDto) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id: createDiagnosticoDefinitivoDto.PacienteId },
      });

      if (!paciente) {
        throw new NotFoundException(`No existe el paciente con id: ${createDiagnosticoDefinitivoDto.PacienteId}`);
      }

      const diagnostico = this.tblDiagnosticoDefinitivo.create({
        ...createDiagnosticoDefinitivoDto,
        paciente: paciente,
      });

      await this.tblDiagnosticoDefinitivo.save(diagnostico);

      return this.omitirCampos(diagnostico);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el diagnostico definitivo');
    }
  }

  async obtenerDiagnosticosDefinitivos() {
    try {
      return await this.tblDiagnosticoDefinitivo.find({
        where: { activo: true },
        select: ['id', 'Diagnostico', 'FechaRegistro'],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerDiagnosticosDefinitivosEliminados() {
    try {
      return await this.tblDiagnosticoDefinitivo.find({
        where: { activo: false },
        select: ['id', 'Diagnostico', 'FechaRegistro'],
        withDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarDiagnosticoDefinitivoPorId(id: number, checkDeleted: boolean = false) {
    try {
      const diagnostico = await this.tblDiagnosticoDefinitivo.findOne({
        where: { id, activo: true },
        withDeleted: true,
      });

      if (!diagnostico) {
        throw new NotFoundException('No se encontró el diagnostico definitivo');
      }

      if (checkDeleted && !diagnostico.deletedAt) {
        throw new NotFoundException('No se encontró el diagnostico definitivo');
      }

      if (!checkDeleted && diagnostico.deletedAt) {
        throw new NotFoundException('No se encontró el diagnostico definitivo');
      }

      return this.omitirCampos(diagnostico);
    } catch (error) {
      throw error;
    }
  }

  async actualizarDiagnosticoDefinitivo(id: number, updateDiagnosticoDefinitivoDto: UpdateDiagnosticoDefinitivoDto) {
    try {
      const diagnostico = await this.tblDiagnosticoDefinitivo.preload({
        id,
        ...updateDiagnosticoDefinitivoDto,
      });

      if (!diagnostico) {
        throw new NotFoundException('No se encontró el diagnostico definitivo');
      }

      await this.tblDiagnosticoDefinitivo.save(diagnostico);

      return this.omitirCampos(diagnostico);
    } catch (error) {
      throw error;
    }
  }

  async eliminarDiagnosticoDefinitivo(id: number) {
    try {
      const diagnostico = await this.buscarDiagnosticoDefinitivoPorId(id);
      await this.tblDiagnosticoDefinitivo.update(diagnostico.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return {
        message: 'Diagnostico definitivo eliminado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarDiagnosticoDefinitivo(id: number) {
    try {
      const diagnostico = await this.buscarDiagnosticoDefinitivoPorId(id, true);
      await this.tblDiagnosticoDefinitivo.update(diagnostico.id, {
        activo: true,
        deletedAt: null,
      });

      return {
        message: 'Diagnostico definitivo restaurado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: DiagnosticoDefinitivo) {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
