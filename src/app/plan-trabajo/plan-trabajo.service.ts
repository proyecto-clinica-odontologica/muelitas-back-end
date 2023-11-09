import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operatoria } from '../operatoria/entities/operatoria.entity';
import { CreatePlanTrabajoDto } from './dto/create-plan-trabajo.dto';
import { UpdatePlanTrabajoDto } from './dto/update-plan-trabajo.dto';
import { PlanTrabajo } from './entities/plan-trabajo.entity';

@Injectable()
export class PlanTrabajoService {
  constructor(
    @InjectRepository(PlanTrabajo)
    private readonly tblPlanTrabajo: Repository<PlanTrabajo>,

    @InjectRepository(Operatoria)
    private readonly tblOperatoria: Repository<Operatoria>,
  ) {}

  async create(createPlanTrabajoDto: CreatePlanTrabajoDto) {
    try {
      const operatoria = await this.tblOperatoria.findOne({
        where: { id: createPlanTrabajoDto.OperatoriaId },
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      const planTrabajo = this.tblPlanTrabajo.create({
        ...createPlanTrabajoDto,
        operatoria,
      });

      await this.tblPlanTrabajo.save(planTrabajo);

      return this.omitirCampos(planTrabajo);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const planesTrabajos = await this.tblPlanTrabajo.find();
      return this.camposVisibles(planesTrabajos);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const planesTrabajos = await this.tblPlanTrabajo.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(planesTrabajos);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const planTrabajo = await this.tblPlanTrabajo.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!planTrabajo) {
        throw new NotFoundException('No se encontró el plan de trabajo');
      }

      if (!planTrabajo.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar el plan de trabajo que no está eliminado');
      }

      if (planTrabajo.deletedAt && !checkDeleted) {
        throw new BadRequestException('El plan de trabajo fue eliminado anteriormente');
      }

      return this.omitirCampos(planTrabajo);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePlanTrabajoDto: UpdatePlanTrabajoDto) {
    try {
      const operatoria = await this.tblOperatoria.findOne({
        where: { id: updatePlanTrabajoDto.OperatoriaId },
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      const planTrabajo = await this.tblPlanTrabajo.preload({
        id,
        ...updatePlanTrabajoDto,
        operatoria,
      });

      if (!planTrabajo) {
        throw new NotFoundException('No se encontró el plan de trabajo');
      }

      await this.tblPlanTrabajo.save(planTrabajo);
      return this.omitirCampos(planTrabajo);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const planTrabajo = await this.findOneById(id);

      await this.tblPlanTrabajo.update(planTrabajo.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'El plan de trabajo fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const planTrabajo = await this.findOneById(id, true);
      await this.tblPlanTrabajo.update(planTrabajo.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'El plan de trabajo fue restaurado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(planTrabajo: PlanTrabajo) {
    delete planTrabajo?.activo;
    delete planTrabajo?.deletedAt;
    delete planTrabajo?.operatoria?.activo;
    delete planTrabajo?.operatoria?.deletedAt;

    return planTrabajo;
  }

  private camposVisibles(planesTrabajos: PlanTrabajo[]) {
    return planesTrabajos.map((planTrabajo) => this.omitirCampos(planTrabajo));
  }
}
