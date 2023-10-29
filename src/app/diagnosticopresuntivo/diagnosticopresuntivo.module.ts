import { Module } from '@nestjs/common';
import { DiagnosticopresuntivoService } from './diagnosticopresuntivo.service';
import { DiagnosticopresuntivoController } from './diagnosticopresuntivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosticopresuntivo } from './entities/diagnosticopresuntivo.entity';
import { PacienteModule } from '../paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosticopresuntivo]), PacienteModule],
  controllers: [DiagnosticopresuntivoController],
  providers: [DiagnosticopresuntivoService],
})
export class DiagnosticopresuntivoModule {}
