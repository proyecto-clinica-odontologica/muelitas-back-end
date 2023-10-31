import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanycronogramaTratamientoDto } from './dto/create-planycronograma-tratamiento.dto';
import { UpdatePlanycronogramaTratamientoDto } from './dto/update-planycronograma-tratamiento.dto';
import { PlanyCronogramaTratamiento } from './entities/planycronograma-tratamiento.entity';

@Injectable()
export class PlanycronogramaTratamientoService {
  constructor(
    @InjectRepository(PlanyCronogramaTratamiento)
    private readonly tblPlan: Repository<PlanyCronogramaTratamiento>,
  ) {}

  async registrarPlanCronograma(createPlanycronogramaTratamientoDto: CreatePlanycronogramaTratamientoDto) {
    try {
      const plan = this.tblPlan.create(createPlanycronogramaTratamientoDto);
      await this.tblPlan.save(plan);
      return this.omitirCampos(plan);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPlanesCronogramas() {
    try {
      const planes = await this.tblPlan.find({
        where: { activo: true },
      });
      return this.camposVisibles(planes);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPlanesCronogramasEliminados() {
    try {
      const planes = await this.tblPlan.find({
        where: { activo: false },
        withDeleted: true,
      });
      return this.camposVisibles(planes);
    } catch (error) {
      throw error;
    }
  }

  async bucarPlanCronogramaPorId(id: number, checkDeleted: boolean = false) {
    try {
      const plan = await this.tblPlan.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!plan) {
        throw new NotFoundException(`No existe el plan cronograma`);
      }

      if (!checkDeleted && plan.deletedAt) {
        throw new NotFoundException(`El plan cronograma ya fue eliminado`);
      }

      if (checkDeleted && !plan.deletedAt) {
        throw new NotFoundException(`El plan cronograma no fue eliminado`);
      }

      return this.omitirCampos(plan);
    } catch (error) {
      throw error;
    }
  }

  async actualizarPlanCronograma(id: number, updatePlanycronogramaTratamientoDto: UpdatePlanycronogramaTratamientoDto) {
    try {
      const plan = await this.tblPlan.preload({
        id,
        ...updatePlanycronogramaTratamientoDto,
      });

      if (!plan) {
        throw new NotFoundException(`No existe el plan cronograma`);
      }

      await this.tblPlan.save(plan);
      return this.omitirCampos(plan);
    } catch (error) {
      throw error;
    }
  }

  async eliminarPlanCronograma(id: number) {
    try {
      const plan = await this.bucarPlanCronogramaPorId(id);
      await this.tblPlan.update(plan.id, { activo: false, deletedAt: new Date() });

      return { message: `El plan cronograma fue eliminado` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarPlanCronograma(id: number) {
    try {
      const plan = await this.bucarPlanCronogramaPorId(id, true);
      await this.tblPlan.update(plan.id, { activo: true, deletedAt: null });

      return { message: `El plan cronograma fue restaurado` };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(planCronograma: PlanyCronogramaTratamiento) {
    const { activo, deletedAt, ...resto } = planCronograma;
    return resto;
  }

  private camposVisibles(planCronogramas: PlanyCronogramaTratamiento[]) {
    return planCronogramas.map((plan) => this.omitirCampos(plan));
  }
}
