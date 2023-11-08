import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndodonciaModule } from '../endodoncia/endodoncia.module';
import { RadiografiaEndodoncia } from './entities/radiografia-endodoncia.entity';
import { RadiografiaEndodonciaController } from './radiografia-endodoncia.controller';
import { RadiografiaEndodonciaService } from './radiografia-endodoncia.service';

@Module({
  imports: [TypeOrmModule.forFeature([RadiografiaEndodoncia]), EndodonciaModule],
  controllers: [RadiografiaEndodonciaController],
  providers: [RadiografiaEndodonciaService],
  exports: [TypeOrmModule, RadiografiaEndodonciaService],
})
export class RadiografiaEndodonciaModule {}
