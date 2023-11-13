import { Module } from '@nestjs/common';
import { ManifestacionEndodonciaService } from './manifestacion-endodoncia.service';
import { ManifestacionEndodonciaController } from './manifestacion-endodoncia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManifestacionEndodoncia } from './entities/manifestacion-endodoncia.entity';
import { EndodonciaModule } from 'src/endodoncia/endodoncia.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManifestacionEndodoncia]), EndodonciaModule,ManifestacionEndodonciaModule],
  controllers: [ManifestacionEndodonciaController],
  providers: [ManifestacionEndodonciaService],
  exports: [TypeOrmModule, ManifestacionEndodonciaService],

})
export class ManifestacionEndodonciaModule {}
