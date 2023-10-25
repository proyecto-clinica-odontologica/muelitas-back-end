/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { HistoriaClinica } from './dto/historia-clinica.entity';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { HistoriaClinicaService } from './historia-clinica.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica]), PacienteModule],
  controllers: [HistoriaClinicaController],
  providers: [HistoriaClinicaService],
  exports: [TypeOrmModule, HistoriaClinicaService],
})
export class HistoriaClinicaModule {}
