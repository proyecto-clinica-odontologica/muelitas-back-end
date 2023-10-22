import { Module } from '@nestjs/common';
import { CasoDienteController } from './caso_dientes.controller';
import { CasoDienteService } from './caso_dientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caso_Diente } from './caso_diente.entity';
import { DientesModule } from 'src/dientes/dientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Caso_Diente]), DientesModule],
  controllers: [CasoDienteController],
  providers: [CasoDienteService],
  exports:[TypeOrmModule, CasoDienteService]
})
export class CasoDienteModule {}
