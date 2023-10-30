import { Module } from '@nestjs/common';
import { TejidosDurosController } from './tejidos-duros.controller';
import { TejidosDurosService } from './tejidos-duros.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TejidoDuro } from './entity/tejido-duro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TejidoDuro])],
  controllers: [TejidosDurosController],
  providers: [TejidosDurosService],
  exports: [TejidosDurosService]
})
export class TejidosDurosModule {}
