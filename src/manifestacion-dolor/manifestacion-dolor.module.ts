import { Module } from '@nestjs/common';
import { ManifestacionDolorService } from './manifestacion-dolor.service';
import { ManifestacionDolorController } from './manifestacion-dolor.controller';
import { ManifestacionDolor } from './entities/manifestacion-dolor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ManifestacionDolor]), ManifestacionDolorModule],
  controllers: [ManifestacionDolorController],
  providers: [ManifestacionDolorService],
  exports: [TypeOrmModule, ManifestacionDolorService],
})
export class ManifestacionDolorModule { }
