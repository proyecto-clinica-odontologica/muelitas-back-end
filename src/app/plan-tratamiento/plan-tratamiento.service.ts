import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cirugia } from '../cirugia/entities/cirugia.entity';
import { CreatePlanTratamientoDto } from './dto/create-plan-tratamiento.dto';
import { UpdatePlanTratamientoDto } from './dto/update-plan-tratamiento.dto';
import { PlanTratamiento } from './entities/plan-tratamiento.entity';

@Injectable()
export class PlanTratamientoService {
  constructor(
    @InjectRepository(PlanTratamiento)
    private tblPlanTratamiento: Repository<PlanTratamiento>,

    @InjectRepository(Cirugia)
    private tblCirugia: Repository<Cirugia>,
  ) {}

  async create(createPlanTratamientoDto: CreatePlanTratamientoDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: createPlanTratamientoDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const planTratamiento = this.tblPlanTratamiento.create({
        ...createPlanTratamientoDto,
        cirugia,
      });

      await this.tblPlanTratamiento.save(planTratamiento);

      return this.omitirCampos(planTratamiento);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const planTratamientos = await this.tblPlanTratamiento.find();
      return this.camposVisibles(planTratamientos);
    } catch (error) {
      throw error;
    }
  }

  async findAllDelete() {
    try {
      const planTratamientos = await this.tblPlanTratamiento.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(planTratamientos);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const planTratamiento = await this.tblPlanTratamiento.findOne({
        where: { id },
        withDeleted: checkDeleted,
      });

      if (!planTratamiento) {
        throw new NotFoundException('No se encontró el plan de tratamiento');
      }

      if (planTratamiento.deletedAt && !checkDeleted) {
        throw new NotFoundException('El plan de tratamiendo fue eliminado anteriormente');
      }

      if (!planTratamiento.deletedAt && checkDeleted) {
        throw new NotFoundException('No se puede restaurar un plan de tratamiento que no ah sido eliminado');
      }

      return this.omitirCampos(planTratamiento);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePlanTratamientoDto: UpdatePlanTratamientoDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: updatePlanTratamientoDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const planTratamiento = await this.tblPlanTratamiento.preload({
        id,
        ...updatePlanTratamientoDto,
        cirugia,
      });

      if (!planTratamiento) {
        throw new NotFoundException('No se encontró el plan de tratamiento');
      }

      await this.tblPlanTratamiento.save(planTratamiento);

      return this.omitirCampos(planTratamiento);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const planTratamiento = await this.findOneById(id);
      await this.tblPlanTratamiento.update(planTratamiento.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'Se eliminó el plan de tratamiento correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const planTratamiento = await this.findOneById(id, true);
      await this.tblPlanTratamiento.update(planTratamiento.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'Se restauró el plan de tratamiento correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(planTratamiento: PlanTratamiento) {
    delete planTratamiento?.activo;
    delete planTratamiento?.deletedAt;
    delete planTratamiento?.cirugia?.activo;
    delete planTratamiento?.cirugia?.deletedAt;

    return planTratamiento;
  }

  private camposVisibles(planTratamientos: PlanTratamiento[]) {
    return planTratamientos.map((planTratamiento) => this.omitirCampos(planTratamiento));
  }
}
