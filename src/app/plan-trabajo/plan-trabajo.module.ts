import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatoriaModule } from '../operatoria/operatoria.module';
import { PlanTrabajo } from './entities/plan-trabajo.entity';
import { PlanTrabajoController } from './plan-trabajo.controller';
import { PlanTrabajoService } from './plan-trabajo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanTrabajo]), OperatoriaModule],
  controllers: [PlanTrabajoController],
  providers: [PlanTrabajoService],
  exports: [TypeOrmModule, PlanTrabajoService],
})
export class PlanTrabajoModule {}
