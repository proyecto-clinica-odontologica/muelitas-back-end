import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamenEstomatologicoDto } from './dto/create-examen-estomatologico.dto';
import { UpdateExamenEstomatologicoDto } from './dto/update-examen-estomatologico.dto';
// import { PacienteService } from 'src/paciente/paciente.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamenEstomatologico } from './entities/examen-estomatologico.entity';
import { Repository } from 'typeorm/repository/Repository';
@Injectable()
export class ExamenEstomatologicoService {

  constructor(
    @InjectRepository(ExamenEstomatologico)
    private bdExamen: Repository<ExamenEstomatologico>,

    // private  dbPaciente: PacienteService,

  ) { }


  async create(PacienteId: number, createExamenEstomatologicoDto: CreateExamenEstomatologicoDto) {
    try {
      // const Paciente = await this.dbPaciente.findOne(PacienteId);
      const ExamenEstomatologico = this.bdExamen.create(createExamenEstomatologicoDto);
      // ExamenEstomatologico.Paciente = Paciente;
      return await this.bdExamen.save(ExamenEstomatologico);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.bdExamen.find({ relations: ['Paciente'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    let examenEstomatologico: ExamenEstomatologico;
    try {
      if (isNaN(+id)) {
        examenEstomatologico = await this.bdExamen.findOneBy({ IdExamenEstomatologico: +id });
      }

      if (!examenEstomatologico) {
        throw new NotFoundException(
          `no existe un examen estomatológico con el id ${id} en la base de datos`,
        );
      }

      return examenEstomatologico;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateExamenEstomatologicoDto: UpdateExamenEstomatologicoDto) {
    updateExamenEstomatologicoDto.Facie = updateExamenEstomatologicoDto.Facie?.toLowerCase();
    updateExamenEstomatologicoDto.Craneo = updateExamenEstomatologicoDto.Craneo?.toLowerCase();
    updateExamenEstomatologicoDto.Cara = updateExamenEstomatologicoDto.Cara?.toLowerCase();
    updateExamenEstomatologicoDto.SimetriaTresTercios = updateExamenEstomatologicoDto.SimetriaTresTercios?.toLowerCase();
    updateExamenEstomatologicoDto.SimetriaBilateral = updateExamenEstomatologicoDto.SimetriaBilateral?.toLowerCase();
    updateExamenEstomatologicoDto.SimetriaPerfil = updateExamenEstomatologicoDto.SimetriaPerfil?.toLowerCase();
    updateExamenEstomatologicoDto.ATMtrayectoriaaperturaycierre = updateExamenEstomatologicoDto.ATMtrayectoriaaperturaycierre?.toLowerCase();
    updateExamenEstomatologicoDto.ATMfluidosdelaATM = updateExamenEstomatologicoDto.ATMfluidosdelaATM?.toLowerCase();
    updateExamenEstomatologicoDto.ATMpalpitacion = updateExamenEstomatologicoDto.ATMpalpitacion?.toLowerCase();
    updateExamenEstomatologicoDto.ATMgradodeapertura = updateExamenEstomatologicoDto.ATMgradodeapertura?.toLowerCase();
    updateExamenEstomatologicoDto.Ganglios = updateExamenEstomatologicoDto.Ganglios?.toLowerCase();
    // updateNotasEvolutivaDto.PacienteId = updateNotasEvolutivaDto.PacienteId?;
  

    try {
      const examenEstomatologico = await this.bdExamen.preload({
        IdExamenEstomatologico: id,
        ...updateExamenEstomatologicoDto,
      });
      await this.bdExamen.save(updateExamenEstomatologicoDto);
      return examenEstomatologico;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const examenEstomatologico = await this.findOne(id);
      await this.bdExamen.remove(examenEstomatologico);
      return {
        message: `El examen estomatologico con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
