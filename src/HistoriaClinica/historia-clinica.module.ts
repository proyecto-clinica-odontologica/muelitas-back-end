/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from './dto/historia-clinica.entity';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { HistoriaClinicaService } from './historia-clinica.service';
import { PacienteModule } from 'src/paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica]), PacienteModule],
  controllers: [HistoriaClinicaController],
  providers: [HistoriaClinicaService],
  exports: [TypeOrmModule, HistoriaClinicaService],
})
export class HistoriaClinicaModule {}
