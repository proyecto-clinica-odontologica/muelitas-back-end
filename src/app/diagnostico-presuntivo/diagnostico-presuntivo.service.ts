import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiagnosticoPresuntivoDto } from './dto/create-diagnostico-presuntivo.dto';
import { UpdateDiagnosticoPresuntivoDto } from './dto/update-diagnostico-presuntivo.dto';
import { DiagnosticoPresuntivo } from './entities/diagnostico-presuntivo.entity';

@Injectable()
export class DiagnosticoPresuntivoService {
  constructor(
    @InjectRepository(DiagnosticoPresuntivo)
    private readonly tblDiagnostico: Repository<DiagnosticoPresuntivo>,
  ) {}
  async crearDiagnosticoPresuntivo(createDiagnosticoPresuntivoDto: CreateDiagnosticoPresuntivoDto) {
    try {
      const diagnostico = this.tblDiagnostico.create(createDiagnosticoPresuntivoDto);
      await this.tblDiagnostico.save(diagnostico);

      delete diagnostico.activo;
      delete diagnostico.deletedAt;

      return diagnostico;
    } catch (error) {
      throw error;
    }
  }

  async obtenerDiagnosticosPresuntivos() {
    try {
      return await this.tblDiagnostico.find({
        where: { activo: true },
        select: ['id', 'Diagnostico', 'FechaRegistro'],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerDiagnosticosPresuntivosEliminados() {
    try {
      return await this.tblDiagnostico.find({
        where: { activo: false },
        withDeleted: true,
        select: ['id', 'Diagnostico', 'FechaRegistro'],
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarDiagnosticoPresuntivoPorId(id: number) {
    try {
      const diagnostico = await this.tblDiagnostico.findOne({
        where: { activo: true },
        select: ['id', 'Diagnostico', 'FechaRegistro'],
      });

      if (!diagnostico) {
        throw new NotFoundException(`No existe el diagnóstico presuntivo con id: ${id}`);
      }

      delete diagnostico.activo;
      delete diagnostico.deletedAt;

      return diagnostico;
    } catch (error) {
      throw error;
    }
  }

  async actualizarDiagnosticoPresuntivo(id: number, updateDiagnosticoPresuntivoDto: UpdateDiagnosticoPresuntivoDto) {
    try {
      const diagnostico = await this.tblDiagnostico.preload({
        id,
        ...updateDiagnosticoPresuntivoDto,
      });

      if (!diagnostico) {
        throw new NotFoundException(`No existe el diagnóstico presuntivo con id: ${id}`);
      }

      await this.tblDiagnostico.save(diagnostico);

      delete diagnostico.activo;
      delete diagnostico.deletedAt;

      return diagnostico;
    } catch (error) {
      throw error;
    }
  }

  async eliminarDiagnosticoPresuntivo(id: number) {
    try {
      const diagnostico = await this.buscarDiagnosticoPresuntivoPorId(id);
      await this.tblDiagnostico.softRemove(diagnostico);

      return {
        message: 'Diagnóstico presuntivo eliminado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarDiagnosticoPresuntivo(id: number) {
    try {
      const diagnostico = await this.tblDiagnostico.findOne({
        where: { id, activo: false },
        withDeleted: true,
      });

      if (!diagnostico) {
        throw new NotFoundException(`No existe el diagnóstico presuntivo con id: ${id}`);
      }

      await this.tblDiagnostico.recover(diagnostico);

      return {
        message: 'Diagnóstico presuntivo restaurado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }
}
