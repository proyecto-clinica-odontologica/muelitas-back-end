import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { Operatoria } from './entities/operatoria.entity';
import { OperatoriaController } from './operatoria.controller';
import { OperatoriaService } from './operatoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operatoria]), PacienteModule],
  controllers: [OperatoriaController],
  providers: [OperatoriaService],
  exports: [TypeOrmModule, OperatoriaService],
})
export class OperatoriaModule {}
