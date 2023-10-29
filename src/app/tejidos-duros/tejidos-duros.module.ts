import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TejidoDuro } from './entities/tejido-duro.entity';
import { TejidosDurosController } from './tejidos-duros.controller';
import { TejidosDurosService } from './tejidos-duros.service';

@Module({
  imports: [TypeOrmModule.forFeature([TejidoDuro])],
  controllers: [TejidosDurosController],
  providers: [TejidosDurosService],
  exports: [TypeOrmModule, TejidosDurosService],
})
export class TejidosDurosModule {}
