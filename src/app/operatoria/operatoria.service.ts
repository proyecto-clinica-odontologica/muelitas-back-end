import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateOperatoriaDto } from './dto/create-operatoria.dto';
import { UpdateOperatoriaDto } from './dto/update-operatoria.dto';
import { Operatoria } from './entities/operatoria.entity';

@Injectable()
export class OperatoriaService {
  constructor(
    @InjectRepository(Operatoria)
    private readonly tblOperatoria: Repository<Operatoria>,

    @InjectRepository(Paciente)
    private readonly tblPaciente: Repository<Paciente>,
  ) {}

  async create(createOperatoriaDto: CreateOperatoriaDto) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id: createOperatoriaDto.PacienteId },
      });

      if (!paciente) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const operatoria = this.tblOperatoria.create({
        ...createOperatoriaDto,
        paciente,
      });

      await this.tblOperatoria.save(operatoria);

      return this.omitirCampos(operatoria);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const operatorias = await this.tblOperatoria.find();
      return this.camposVisibles(operatorias);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const operatorias = await this.tblOperatoria.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(operatorias);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const operatoria = await this.tblOperatoria.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      if (!operatoria.deletedAt && checkDeleted) {
        throw new NotFoundException('No se puede restaurar la operatoria por que no está eliminada');
      }

      if (operatoria.deletedAt && !checkDeleted) {
        throw new NotFoundException('la operatoria fue eliminada anteriormente');
      }

      return this.omitirCampos(operatoria);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOperatoriaDto: UpdateOperatoriaDto) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id: updateOperatoriaDto.PacienteId },
      });

      if (!paciente) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const operatoria = await this.tblOperatoria.preload({
        id,
        ...updateOperatoriaDto,
        paciente,
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      await this.tblOperatoria.save(operatoria);

      return this.omitirCampos(operatoria);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const operatoria = await this.findOneById(id);
      await this.tblOperatoria.update(operatoria.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'La operatoria fue eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const operatoria = await this.findOneById(id, true);
      await this.tblOperatoria.update(operatoria.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'La operatoria fue restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(operatoria: Operatoria) {
    delete operatoria?.activo;
    delete operatoria?.deletedAt;
    delete operatoria?.paciente?.activo;
    delete operatoria?.paciente?.deletedAt;

    return operatoria;
  }

  private camposVisibles(operatorias: Operatoria[]) {
    return operatorias.map((operatoria) => this.omitirCampos(operatoria));
  }
}
