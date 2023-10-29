import { Module } from '@nestjs/common';
import { ExamenesauxiliaresService } from './examenesauxiliares.service';
import { ExamenesauxiliaresController } from './examenesauxiliares.controller';
import { Examenesauxiliare } from './entities/examenesauxiliare.entity';
import { PacienteModule } from '../paciente/paciente.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Examenesauxiliare]), PacienteModule],
  controllers: [ExamenesauxiliaresController],
  providers: [ExamenesauxiliaresService],
})
export class ExamenesauxiliaresModule {}
