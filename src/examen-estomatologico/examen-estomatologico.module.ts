import { Module } from '@nestjs/common';
import { ExamenEstomatologicoService } from './examen-estomatologico.service';
import { ExamenEstomatologicoController } from './examen-estomatologico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenEstomatologico } from './entities/examen-estomatologico.entity';
import { PacienteModule } from 'muelitas-back-end/dist/paciente/paciente.module';

@Module({

  imports: [TypeOrmModule.forFeature([ExamenEstomatologico]), PacienteModule],
  controllers: [ExamenEstomatologicoController],
  providers: [ExamenEstomatologicoService],
  exports: [TypeOrmModule, ExamenEstomatologicoService],
})
export class ExamenEstomatologicoModule {}
