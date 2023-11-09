import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticosController } from './diagnosticos.controller';
import { DiagnosticosService } from './diagnosticos.service';
import { Diagnostico } from './entities/diagnostico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostico])],
  controllers: [DiagnosticosController],
  providers: [DiagnosticosService],
  exports: [TypeOrmModule, DiagnosticosService],
})
export class DiagnosticosModule {}
