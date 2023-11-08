import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { CirugiaController } from './cirugia.controller';
import { CirugiaService } from './cirugia.service';
import { Cirugia } from './entities/cirugia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cirugia]), PacienteModule],
  controllers: [CirugiaController],
  providers: [CirugiaService],
  exports: [TypeOrmModule, CirugiaService],
})
export class CirugiaModule {}
