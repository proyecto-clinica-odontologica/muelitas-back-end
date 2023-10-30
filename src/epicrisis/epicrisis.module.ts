import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpicrisisService } from './epicrisis.service';
import { EpicrisisController } from './epicrisis.controller';
import { Epicrisis } from './entities/epicrisis.entity';
import { PacienteModule } from 'muelitas-back-end/dist/paciente/paciente.module';

@Module({

  imports: [TypeOrmModule.forFeature([Epicrisis]), PacienteModule],
  controllers: [EpicrisisController],
  providers: [EpicrisisService],
  exports: [TypeOrmModule, EpicrisisService],
})
export class EpicrisisModule {}
