import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndodonciaModule } from '../endodoncia/endodoncia.module';
import { ManifestacionDolorModule } from '../manifestacion-dolor/manifestacion-dolor.module';
import { ManifestacionEndodoncia } from './entities/manifestacion-endodoncia.entity';
import { ManifestacionEndodonciaController } from './manifestacion-endodoncia.controller';
import { ManifestacionEndodonciaService } from './manifestacion-endodoncia.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManifestacionEndodoncia]), ManifestacionDolorModule, EndodonciaModule],
  controllers: [ManifestacionEndodonciaController],
  providers: [ManifestacionEndodonciaService],
  exports: [TypeOrmModule, ManifestacionEndodonciaService],
})
export class ManifestacionEndodonciaModule {}
