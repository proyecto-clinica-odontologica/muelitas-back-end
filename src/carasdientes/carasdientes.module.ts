import { Module } from '@nestjs/common';
import { CarasdientesService } from './carasdientes.service';
import { CarasdientesController } from './carasdientes.controller';

@Module({
  controllers: [CarasdientesController],
  providers: [CarasdientesService],
})
export class CarasdientesModule {}
