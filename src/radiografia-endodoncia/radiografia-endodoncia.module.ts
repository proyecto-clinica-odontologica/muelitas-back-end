import { Module } from '@nestjs/common';
import { RadiografiaEndodonciaService } from './radiografia-endodoncia.service';
import { RadiografiaEndodonciaController } from './radiografia-endodoncia.controller';
import { RadiografiaEndodoncia } from './entities/radiografia-endodoncia.entity';
import { EndodonciaModule } from 'src/endodoncia/endodoncia.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RadiografiaEndodoncia]), EndodonciaModule],
  controllers: [RadiografiaEndodonciaController],
  providers: [RadiografiaEndodonciaService],
  exports: [TypeOrmModule, RadiografiaEndodonciaService],

})
export class RadiografiaEndodonciaModule { }
