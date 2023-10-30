import { Module } from '@nestjs/common';
import { PlanyCronogramaTratamientoService } from './plany-cronograma-tratamiento.service';
import { PlanyCronogramaTratamientoController } from './plany-cronograma-tratamiento.controller';
import { PlainObjectToNewEntityTransformer } from 'typeorm/query-builder/transformer/PlainObjectToNewEntityTransformer';
import { PlanyCronogramaTratamiento } from './entities/plany-cronograma-tratamiento.entity';
import { Paciente } from 'muelitas-back-end/dist/paciente/entities/paciente.entity';
import { PacienteModule } from 'muelitas-back-end/dist/paciente/paciente.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [ TypeOrmModule.forFeature([PlanyCronogramaTratamiento]), PacienteModule] ,
  controllers: [PlanyCronogramaTratamientoController],
  providers: [PlanyCronogramaTratamientoService],
  exports: [TypeOrmModule, PlanyCronogramaTratamientoModule],
})
export class PlanyCronogramaTratamientoModule {}
