import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { PlanyCronogramaTratamiento } from './entities/planycronograma-tratamiento.entity';
import { PlanycronogramaTratamientoController } from './planycronograma-tratamiento.controller';
import { PlanycronogramaTratamientoService } from './planycronograma-tratamiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanyCronogramaTratamiento]), PacienteModule],
  controllers: [PlanycronogramaTratamientoController],
  providers: [PlanycronogramaTratamientoService],
  exports: [TypeOrmModule, PlanycronogramaTratamientoService],
})
export class PlanycronogramaTratamientoModule {}
