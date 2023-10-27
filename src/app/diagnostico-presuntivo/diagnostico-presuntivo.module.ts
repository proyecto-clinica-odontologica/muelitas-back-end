import { Module } from '@nestjs/common';
import { DiagnosticoPresuntivoService } from './diagnostico-presuntivo.service';
import { DiagnosticoPresuntivoController } from './diagnostico-presuntivo.controller';

@Module({
  controllers: [DiagnosticoPresuntivoController],
  providers: [DiagnosticoPresuntivoService],
})
export class DiagnosticoPresuntivoModule {}
