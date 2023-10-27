import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';
import { PacienteModule } from '../paciente/paciente.module';
import { TratamientoModule } from '../tratamiento/tratamiento.module';
import { CitaController } from './cita.controller';
import { CitaService } from './cita.service';
import { Cita } from './entities/cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita]), TratamientoModule, EstudiantesModule, PacienteModule],
  controllers: [CitaController],
  providers: [CitaService],
  exports: [TypeOrmModule, CitaService],
})
export class CitaModule {}
