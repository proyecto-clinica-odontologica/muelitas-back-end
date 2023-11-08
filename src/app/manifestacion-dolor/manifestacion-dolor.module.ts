import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManifestacionDolor } from './entities/manifestacion-dolor.entity';
import { ManifestacionDolorController } from './manifestacion-dolor.controller';
import { ManifestacionDolorService } from './manifestacion-dolor.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManifestacionDolor])],
  controllers: [ManifestacionDolorController],
  providers: [ManifestacionDolorService],
  exports: [TypeOrmModule, ManifestacionDolorService],
})
export class ManifestacionDolorModule {}
