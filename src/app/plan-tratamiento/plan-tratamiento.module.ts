import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CirugiaModule } from '../cirugia/cirugia.module';
import { PlanTratamiento } from './entities/plan-tratamiento.entity';
import { PlanTratamientoController } from './plan-tratamiento.controller';
import { PlanTratamientoService } from './plan-tratamiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanTratamiento]), CirugiaModule],
  controllers: [PlanTratamientoController],
  providers: [PlanTratamientoService],
  exports: [TypeOrmModule, PlanTratamientoService],
})
export class PlanTratamientoModule {}
