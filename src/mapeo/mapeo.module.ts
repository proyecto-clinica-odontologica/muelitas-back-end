import { Module } from '@nestjs/common';
import { MapeoService } from './mapeo.service';
import { MapeoController } from './mapeo.controller';

@Module({
  controllers: [MapeoController],
  providers: [MapeoService],
})
export class MapeoModule {}
