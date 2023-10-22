import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapeoModule } from 'src/mapeo/mapeo.module';
import { CarasdientesController } from './carasdientes.controller';
import { CarasdientesService } from './carasdientes.service';
import { Carasdiente } from './entities/carasdiente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carasdiente]), MapeoModule],
  controllers: [CarasdientesController],
  providers: [CarasdientesService],
  exports: [TypeOrmModule, CarasdientesService],
})
export class CarasdientesModule {}
