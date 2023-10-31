import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenEstomatologico } from './entities/examen-estomatologico.entity';
import { ExamenEstomatologicoController } from './examen-estomatologico.controller';
import { ExamenEstomatologicoService } from './examen-estomatologico.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenEstomatologico])],
  controllers: [ExamenEstomatologicoController],
  providers: [ExamenEstomatologicoService],
  exports: [TypeOrmModule, ExamenEstomatologicoService],
})
export class ExamenEstomatologicoModule {}
