import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { TratamientoModule } from 'src/tratamiento/tratamiento.module';
import { CitaController } from './cita.controller';
import { CitaService } from './cita.service';
import { Cita } from './entities/cita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cita]),
    TratamientoModule,
    EstudiantesModule,
  ],
  controllers: [CitaController],
  providers: [CitaService],
  exports: [TypeOrmModule, CitaService],
})
export class CitaModule {}
