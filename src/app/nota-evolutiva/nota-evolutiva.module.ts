import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaEvolutiva } from './entities/nota-evolutiva.entity';
import { NotaEvolutivaController } from './nota-evolutiva.controller';
import { NotaEvolutivaService } from './nota-evolutiva.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotaEvolutiva])],
  controllers: [NotaEvolutivaController],
  providers: [NotaEvolutivaService],
  exports: [TypeOrmModule, NotaEvolutivaService],
})
export class NotaEvolutivaModule {}
