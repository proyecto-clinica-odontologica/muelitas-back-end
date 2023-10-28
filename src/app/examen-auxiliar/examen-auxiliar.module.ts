import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenAuxiliar } from './entities/examen-auxiliar.entity';
import { ExamenAuxiliarController } from './examen-auxiliar.controller';
import { ExamenAuxiliarService } from './examen-auxiliar.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenAuxiliar])],
  controllers: [ExamenAuxiliarController],
  providers: [ExamenAuxiliarService],
  exports: [TypeOrmModule, ExamenAuxiliarService],
})
export class ExamenAuxiliarModule {}
