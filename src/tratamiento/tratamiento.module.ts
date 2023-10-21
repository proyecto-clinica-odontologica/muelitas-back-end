import { Module } from '@nestjs/common';
import { TratamientoService } from './tratamiento.service';
import { TratamientoController } from './tratamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';
import { Cita } from 'src/cita/entities/cita.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tratamiento, Cita])],
  controllers: [TratamientoController],
  providers: [TratamientoService],
})
export class TratamientoModule {}
