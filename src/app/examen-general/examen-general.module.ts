import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenGeneral } from './entities/examen-general.entity';
import { ExamenGeneralController } from './examen-general.controller';
import { ExamenGeneralService } from './examen-general.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenGeneral])],
  controllers: [ExamenGeneralController],
  providers: [ExamenGeneralService],
  exports: [TypeOrmModule, ExamenGeneralService],
})
export class ExamenGeneralModule {}
