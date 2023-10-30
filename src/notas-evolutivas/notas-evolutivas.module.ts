import { Module } from '@nestjs/common';
import { NotasEvolutivasService } from './notas-evolutivas.service';
import { NotasEvolutivasController } from './notas-evolutivas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotasEvolutiva } from './entities/notas-evolutiva.entity';
import { PacienteModule } from 'muelitas-back-end/dist/paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotasEvolutiva]), PacienteModule],
  controllers: [NotasEvolutivasController],
  providers: [NotasEvolutivasService],
  exports: [TypeOrmModule, NotasEvolutivasService],
})



export class NotasEvolutivasModule { }
