import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdontogramaModule } from 'src/odontograma/odontograma.module';
import { Mapeo } from './entities/mapeo.entity';
import { MapeoController } from './mapeo.controller';
import { MapeoService } from './mapeo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mapeo]), OdontogramaModule],
  controllers: [MapeoController],
  providers: [MapeoService],
  exports: [TypeOrmModule, MapeoService],
})
export class MapeoModule {}
