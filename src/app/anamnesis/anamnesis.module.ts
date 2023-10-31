import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { AnamnesisController } from './anamnesis.controller';
import { AnamnesisService } from './anamnesis.service';
import { Anamnesis } from './entities/anamnesis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anamnesis]), PacienteModule],
  controllers: [AnamnesisController],
  providers: [TypeOrmModule, AnamnesisService],
})
export class AnamnesisModule {}
