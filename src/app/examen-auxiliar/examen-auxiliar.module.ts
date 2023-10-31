import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { ExamenAuxiliar } from './entities/examen-auxiliar.entity';
import { ExamenAuxiliarController } from './examen-auxiliar.controller';
import { ExamenAuxiliarService } from './examen-auxiliar.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenAuxiliar]), PacienteModule],
  controllers: [ExamenAuxiliarController],
  providers: [ExamenAuxiliarService],
  exports: [TypeOrmModule, ExamenAuxiliarService],
})
export class ExamenAuxiliarModule {}
