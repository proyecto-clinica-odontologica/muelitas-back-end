import { Module } from '@nestjs/common';
import { ExamenIntrabucalService } from './examen-intrabucal.service';
import { ExamenIntrabucalController } from './examen-intrabucal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenIntrabucal } from './entity/examen-intrabucal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenIntrabucal])],
  providers: [ExamenIntrabucalService],
  controllers: [ExamenIntrabucalController],
  exports:[ExamenIntrabucalService]
})
export class ExamenIntrabucalModule {}
