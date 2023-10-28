import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnivelPiezaController } from './anivel-pieza.controller';
import { AnivelPiezaService } from './anivel-pieza.service';
import { AnivelPieza } from './entities/anivel-pieza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnivelPieza])],
  controllers: [AnivelPiezaController],
  providers: [AnivelPiezaService],
  exports: [TypeOrmModule, AnivelPiezaService],
})
export class AnivelPiezaModule {}
