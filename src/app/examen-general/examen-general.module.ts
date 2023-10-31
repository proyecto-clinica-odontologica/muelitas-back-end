import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenGeneral } from './entities/examen-general.entity';
import { ExamenGeneralController } from './examen-general.controller';
import { ExamenGeneralService } from './examen-general.service';
import { PacienteModule } from '../paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenGeneral]), PacienteModule],
  controllers: [ExamenGeneralController],
  providers: [ExamenGeneralService],
  exports: [TypeOrmModule, ExamenGeneralService],
})
export class ExamenGeneralModule {}
