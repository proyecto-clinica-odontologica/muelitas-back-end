import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interpretacion } from './entities/interpretacion.entity';
import { InterpretacionController } from './interpretacion.controller';
import { InterpretacionService } from './interpretacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Interpretacion])],
  controllers: [InterpretacionController],
  providers: [InterpretacionService],
  exports: [TypeOrmModule, InterpretacionService],
})
export class InterpretacionModule {}
