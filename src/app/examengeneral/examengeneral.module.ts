import { Module } from '@nestjs/common';
import { ExamengeneralService } from './examengeneral.service';
import { ExamengeneralController } from './examengeneral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenGeneral } from './entities/examengeneral.entity';
import { PacienteModule } from '../paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenGeneral]), PacienteModule],
  controllers: [ExamengeneralController],
  providers: [ExamengeneralService],
})
export class ExamengeneralModule {}
