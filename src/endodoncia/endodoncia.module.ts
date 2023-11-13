import { Module } from '@nestjs/common';
import { EndodonciaService } from './endodoncia.service';
import { EndodonciaController } from './endodoncia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endodoncia } from './entities/endodoncia.entity';
import { PacienteModule } from 'muelitas-back-end/dist/paciente/paciente.module';


@Module({
  imports: [ TypeOrmModule.forFeature([Endodoncia]), PacienteModule] ,
  controllers: [EndodonciaController],
  providers: [EndodonciaService],
  exports: [TypeOrmModule, EndodonciaService],
})
export class EndodonciaModule {}
