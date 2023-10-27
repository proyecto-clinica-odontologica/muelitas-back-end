import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DientesModule } from '../dientes/dientes.module';
import { Caso_Diente } from './caso_diente.entity';
import { CasoDienteController } from './caso_dientes.controller';
import { CasoDienteService } from './caso_dientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Caso_Diente]), DientesModule],
  controllers: [CasoDienteController],
  providers: [CasoDienteService],
  exports: [TypeOrmModule, CasoDienteService],
})
export class CasoDienteModule {}
