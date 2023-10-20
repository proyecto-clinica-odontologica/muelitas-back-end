import { Module } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { SeguimientoController } from './seguimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seguimiento } from './entities/seguimiento.entity';
import { Cita } from 'src/cita/entities/cita.entity';
import { CitaModule } from 'src/cita/cita.module';

@Module({
  imports:[TypeOrmModule.forFeature([Seguimiento, Cita])],
  controllers: [SeguimientoController],
  providers: [SeguimientoService],
})
export class SeguimientoModule {}
