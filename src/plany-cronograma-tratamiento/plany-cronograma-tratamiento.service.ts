import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanyCronogramaTratamientoDto } from './dto/create-plany-cronograma-tratamiento.dto';
import { UpdatePlanyCronogramaTratamientoDto } from './dto/update-plany-cronograma-tratamiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanyCronogramaTratamiento } from './entities/plany-cronograma-tratamiento.entity';
import { Repository } from 'typeorm/repository/Repository';
// import { PacienteService } from 'src/paciente/paciente.service';

@Injectable()
export class PlanyCronogramaTratamientoService {

  constructor(
    @InjectRepository(PlanyCronogramaTratamiento)
    private bdPlany: Repository<PlanyCronogramaTratamiento>,

    // private  dbPaciente: PacienteService,

  ) {}


  async create(PacienteId:number, createPlanyCronogramaTratamientoDto: CreatePlanyCronogramaTratamientoDto) {
    try {
      // const Paciente = await this.dbPaciente.findOne(PacienteId);
      const planyCronogramaTratamiento = this.bdPlany.create(createPlanyCronogramaTratamientoDto);
      // planyCronogramaTratamiento.Paciente = Paciente;
      return await this.bdPlany.save(planyCronogramaTratamiento);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.bdPlany.find({ relations: ['Paciente'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    let planyCronogramaTratamiento: PlanyCronogramaTratamiento;
    try {
      if (isNaN(+id)) {
        planyCronogramaTratamiento = await this.bdPlany.findOneBy({ IdPlanTratamiento: +id });
      } 

      if (!planyCronogramaTratamiento) {
        throw new NotFoundException(
          `no existe una planificacion con el id ${id} en la base de datos`,
        );
      }

      return planyCronogramaTratamiento;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePlanyCronogramaTratamientoDto: UpdatePlanyCronogramaTratamientoDto) {
    updatePlanyCronogramaTratamientoDto.Resumen = updatePlanyCronogramaTratamientoDto.Resumen?.toLowerCase();
    updatePlanyCronogramaTratamientoDto.Especificaciones = updatePlanyCronogramaTratamientoDto.Especificaciones?.toLowerCase();
    updatePlanyCronogramaTratamientoDto.Observaciones = updatePlanyCronogramaTratamientoDto.Observaciones?.toLowerCase();
    // updateInterpretacionDto.PacienteId = updateInterpretacionDto.PacienteId?;
  

    try {
      const planyCronogramaTratamiento = await this.bdPlany.preload({
        IdPlanTratamiento: id,
        ...updatePlanyCronogramaTratamientoDto,
      });
      await this.bdPlany.save(planyCronogramaTratamiento);
      return planyCronogramaTratamiento;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const planyCronogramaTratamiento = await this.findOne(id);
      await this.bdPlany.remove(planyCronogramaTratamiento);
      return {
        message: `la planificacion con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
