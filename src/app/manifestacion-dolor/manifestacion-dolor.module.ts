import { Module } from '@nestjs/common';
import { ManifestacionDolorService } from './manifestacion-dolor.service';
import { ManifestacionDolorController } from './manifestacion-dolor.controller';

@Module({
  controllers: [ManifestacionDolorController],
  providers: [ManifestacionDolorService],
})
export class ManifestacionDolorModule {}
