import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanycronogramaTratamiento } from './entities/planycronograma-tratamiento.entity';
import { PlanycronogramaTratamientoController } from './planycronograma-tratamiento.controller';
import { PlanycronogramaTratamientoService } from './planycronograma-tratamiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanycronogramaTratamiento])],
  controllers: [PlanycronogramaTratamientoController],
  providers: [PlanycronogramaTratamientoService],
  exports: [TypeOrmModule, PlanycronogramaTratamientoService],
})
export class PlanycronogramaTratamientoModule {}
