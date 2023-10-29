import { Module } from '@nestjs/common';
import { ExamenIntrabucalService } from './examen-intrabucal.service';
import { ExamenIntrabucalController } from './examen-intrabucal.controller';

@Module({
  controllers: [ExamenIntrabucalController],
  providers: [ExamenIntrabucalService],
})
export class ExamenIntrabucalModule {}
