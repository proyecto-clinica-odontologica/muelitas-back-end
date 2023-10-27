import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaModule } from '../cita/cita.module';
import { Seguimiento } from './entities/seguimiento.entity';
import { SeguimientoController } from './seguimiento.controller';
import { SeguimientoService } from './seguimiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seguimiento]), CitaModule],
  controllers: [SeguimientoController],
  providers: [SeguimientoService],
  exports: [TypeOrmModule, SeguimientoService],
})
export class SeguimientoModule {}
