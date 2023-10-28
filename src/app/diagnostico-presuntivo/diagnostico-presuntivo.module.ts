import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoPresuntivoController } from './diagnostico-presuntivo.controller';
import { DiagnosticoPresuntivoService } from './diagnostico-presuntivo.service';
import { DiagnosticoPresuntivo } from './entities/diagnostico-presuntivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticoPresuntivo])],
  controllers: [DiagnosticoPresuntivoController],
  providers: [DiagnosticoPresuntivoService],
  exports: [TypeOrmModule, DiagnosticoPresuntivoService],
})
export class DiagnosticoPresuntivoModule {}
