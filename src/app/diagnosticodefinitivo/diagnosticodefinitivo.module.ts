import { Module } from '@nestjs/common';
import { DiagnosticodefinitivoService } from './diagnosticodefinitivo.service';
import { DiagnosticodefinitivoController } from './diagnosticodefinitivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosticodefinitivo } from './entities/diagnosticodefinitivo.entity';
import { PacienteModule } from '../paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosticodefinitivo]), PacienteModule],
  controllers: [DiagnosticodefinitivoController],
  providers: [DiagnosticodefinitivoService],
})
export class DiagnosticodefinitivoModule {}
