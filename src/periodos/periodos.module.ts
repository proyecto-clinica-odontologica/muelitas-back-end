import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';
import { PeriodosController } from './periodos.controller';
import { PeriodosService } from './periodos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo])],
  controllers: [PeriodosController],
  providers: [PeriodosService],
  exports: [TypeOrmModule, PeriodosService],
})
export class PeriodosModule {}
