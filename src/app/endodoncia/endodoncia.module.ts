import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { EndodonciaController } from './endodoncia.controller';
import { EndodonciaService } from './endodoncia.service';
import { Endodoncia } from './entities/endodoncia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Endodoncia]), PacienteModule],
  controllers: [EndodonciaController],
  providers: [EndodonciaService],
  exports: [TypeOrmModule, EndodonciaService],
})
export class EndodonciaModule {}
