import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedesModule } from '../sedes/sedes.module';
import { Periodo } from './entities/periodo.entity';
import { PeriodosController } from './periodos.controller';
import { PeriodosService } from './periodos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo]), SedesModule],
  controllers: [PeriodosController],
  providers: [PeriodosService],
  exports: [TypeOrmModule, PeriodosService],
})
export class PeriodosModule {}
