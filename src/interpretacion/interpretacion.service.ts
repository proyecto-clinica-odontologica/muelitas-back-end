import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterpretacionDto } from './dto/create-interpretacion.dto';
import { UpdateInterpretacionDto } from './dto/update-interpretacion.dto';
import { Interpretacion } from './entities/interpretacion.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
// import { PacienteService } from 'src/paciente/paciente.service';

@Injectable()
export class InterpretacionService {

  constructor(
    @InjectRepository(Interpretacion)
    private dbInterpretacion: Repository<Interpretacion>,

    // private  dbPaciente: PacienteService,

  ) {}

  async create(PacienteId:number, createInterpretacionDto: CreateInterpretacionDto) {
  
    try {
      // const Paciente = await this.dbPaciente.findOne(PacienteId);
      const Interpretacion = this.dbInterpretacion.create(createInterpretacionDto);
      // Interpretacion.Paciente = Paciente;
      return await this.dbInterpretacion.save(Interpretacion);
    } catch (error) {
      throw error;
    }
  }
  

  async findAll() {
    try {
      return await this.dbInterpretacion.find({ relations: ['Paciente'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    let interpretacion: Interpretacion;
    try {
      if (isNaN(+id)) {
        interpretacion = await this.dbInterpretacion.findOneBy({ InterpretacionId: +id });
      } 

      if (!interpretacion) {
        throw new NotFoundException(
          `no existe un autor con el id ${id} en la base de datos`,
        );
      }

      return interpretacion;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateInterpretacionDto: UpdateInterpretacionDto) {
    updateInterpretacionDto.RadiografiaPanoramica = updateInterpretacionDto.RadiografiaPanoramica?.toLowerCase();
    updateInterpretacionDto.HemogramaCompleto = updateInterpretacionDto.HemogramaCompleto?.toLowerCase();
    updateInterpretacionDto.TiempoSangrado = updateInterpretacionDto.TiempoSangrado?.toLowerCase();
    updateInterpretacionDto.TiempoCuagulacion = updateInterpretacionDto.TiempoCuagulacion?.toLowerCase();
    updateInterpretacionDto.FechaRegistro = updateInterpretacionDto.FechaRegistro;
    // updateInterpretacionDto.PacienteId = updateInterpretacionDto.PacienteId?;
  

    try {
      const interpretacion = await this.dbInterpretacion.preload({
        InterpretacionId: id,
        ...updateInterpretacionDto,
      });
      await this.dbInterpretacion.save(interpretacion);
      return interpretacion;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const interpretacion = await this.findOne(id);
      await this.dbInterpretacion.remove(interpretacion);
      return {
        message: `la interpretacion con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }

}




