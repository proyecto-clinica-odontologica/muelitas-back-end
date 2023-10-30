import { Module } from '@nestjs/common';
import { AnivelPiezaService } from './anivel-pieza.service';
import { AnivelPiezaController } from './anivel-pieza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnivelPieza } from './entity/anivel-pieza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnivelPieza])],
  providers: [AnivelPiezaService],
  controllers: [AnivelPiezaController],
  exports:[AnivelPiezaService],
})
export class AnivelPiezaModule {}
