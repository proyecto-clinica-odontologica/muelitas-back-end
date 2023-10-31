import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanyCronogramaTratamiento } from './entities/planycronograma-tratamiento.entity';
import { PlanycronogramaTratamientoController } from './planycronograma-tratamiento.controller';
import { PlanycronogramaTratamientoService } from './planycronograma-tratamiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanyCronogramaTratamiento])],
  controllers: [PlanycronogramaTratamientoController],
  providers: [PlanycronogramaTratamientoService],
  exports: [TypeOrmModule, PlanycronogramaTratamientoService],
})
export class PlanycronogramaTratamientoModule {}
