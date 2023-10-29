import { Module } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { AnamnesisController } from './anamnesis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anamnesis } from './entities/anamnesis.entity';
import { PacienteModule } from '../paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Anamnesis]), PacienteModule],
  controllers: [AnamnesisController],
  providers: [AnamnesisService],
})
export class AnamnesisModule {}
