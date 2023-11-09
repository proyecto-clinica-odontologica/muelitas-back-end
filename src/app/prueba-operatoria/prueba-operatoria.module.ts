import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatoriaModule } from '../operatoria/operatoria.module';
import { PruebaModule } from '../prueba/prueba.module';
import { PruebaOperatoria } from './entities/prueba-operatoria.entity';
import { PruebaOperatoriaController } from './prueba-operatoria.controller';
import { PruebaOperatoriaService } from './prueba-operatoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([PruebaOperatoria]), OperatoriaModule, PruebaModule],
  controllers: [PruebaOperatoriaController],
  providers: [PruebaOperatoriaService],
  exports: [TypeOrmModule, PruebaOperatoriaService],
})
export class PruebaOperatoriaModule {}
