import { Module } from '@nestjs/common';
import { InterpretacionService } from './interpretacion.service';
import { InterpretacionController } from './interpretacion.controller';
import { Interpretacion } from './entities/interpretacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from 'muelitas-back-end/dist/paciente/entities/paciente.entity';
import { PacienteModule } from 'muelitas-back-end/dist/paciente/paciente.module';
@Module({
  imports: [ TypeOrmModule.forFeature([Interpretacion]), PacienteModule] ,
  controllers: [InterpretacionController],
  providers: [InterpretacionService],
  exports: [TypeOrmModule, InterpretacionService],
})

export class InterpretacionModule {}
