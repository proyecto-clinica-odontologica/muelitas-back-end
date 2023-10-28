import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiagnosticoDefinitivoDto } from './dto/create-diagnostico-definitivo.dto';
import { UpdateDiagnosticoDefinitivoDto } from './dto/update-diagnostico-definitivo.dto';
import { DiagnosticoDefinitivo } from './entities/diagnostico-definitivo.entity';

@Injectable()
export class DiagnosticoDefinitivoService {
  constructor(
    @InjectRepository(DiagnosticoDefinitivo)
    private readonly tblDiagnosticoDefinitivo: Repository<DiagnosticoDefinitivo>,
  ) {}

  async crearDiagnosticoDefinitivo(createDiagnosticoDefinitivoDto: CreateDiagnosticoDefinitivoDto) {
    try {
      const diagnostico = this.tblDiagnosticoDefinitivo.create(createDiagnosticoDefinitivoDto);

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

  async buscarDiagnosticoDefinitivoPorId(id: number) {
    try {
      const diagnostico = await this.tblDiagnosticoDefinitivo.findOneOrFail({
        where: { id, activo: true },
        select: ['id', 'Diagnostico', 'FechaRegistro'],
      });

      return diagnostico;
    } catch (error) {
      throw new NotFoundException('No se encontró el diagnostico definitivo');
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
      await this.tblDiagnosticoDefinitivo.softRemove(diagnostico);

      return {
        message: 'Diagnostico definitivo eliminado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarDiagnosticoDefinitivo(id: number) {
    try {
      const diagnostico = await this.tblDiagnosticoDefinitivo.findOneOrFail({
        where: { id, activo: false },
        withDeleted: true,
      });

      await this.tblDiagnosticoDefinitivo.recover(diagnostico);

      diagnostico.activo = true;

      await this.tblDiagnosticoDefinitivo.save(diagnostico);

      return {
        message: 'Diagnostico definitivo restaurado correctamente',
      };
    } catch (error) {
      throw new NotFoundException('No se encontró el examen auxiliar');
    }
  }

  private omitirCampos(entidad: Partial<DiagnosticoDefinitivo>): Partial<DiagnosticoDefinitivo> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
