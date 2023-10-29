import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenIntrabucal } from './entities/examen-intrabucal.entity';
import { ExamenIntrabucalController } from './examen-intrabucal.controller';
import { ExamenIntrabucalService } from './examen-intrabucal.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenIntrabucal])],
  controllers: [ExamenIntrabucalController],
  providers: [ExamenIntrabucalService],
  exports: [TypeOrmModule, ExamenIntrabucalService],
})
export class ExamenIntrabucalModule {}
