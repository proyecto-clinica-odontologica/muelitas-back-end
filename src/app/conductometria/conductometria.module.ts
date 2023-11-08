import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndodonciaModule } from '../endodoncia/endodoncia.module';
import { ConductometriaController } from './conductometria.controller';
import { ConductometriaService } from './conductometria.service';
import { Conductometria } from './entities/conductometria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conductometria]), EndodonciaModule],
  controllers: [ConductometriaController],
  providers: [ConductometriaService],
  exports: [TypeOrmModule, ConductometriaService],
})
export class ConductometriaModule {}
