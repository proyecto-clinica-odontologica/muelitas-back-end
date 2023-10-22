/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { HistoriaClinicaService } from './historia-clinica.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from './dto/historia-clinica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica])],
  controllers: [HistoriaClinicaController],
  providers: [HistoriaClinicaService],
})
export class HistoriaClinicaModule {}
