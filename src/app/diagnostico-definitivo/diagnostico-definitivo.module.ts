import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoDefinitivoController } from './diagnostico-definitivo.controller';
import { DiagnosticoDefinitivoService } from './diagnostico-definitivo.service';
import { DiagnosticoDefinitivo } from './entities/diagnostico-definitivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticoDefinitivo])],
  controllers: [DiagnosticoDefinitivoController],
  providers: [DiagnosticoDefinitivoService],
  exports: [TypeOrmModule, DiagnosticoDefinitivoService],
})
export class DiagnosticoDefinitivoModule {}
