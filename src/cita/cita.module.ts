import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { TratamientoService } from 'src/tratamiento/tratamiento.service';
import { Tratamiento } from 'src/tratamiento/entities/tratamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Tratamiento])],
  controllers: [CitaController],
  providers: [CitaService, TratamientoService],
})
export class CitaModule {}
