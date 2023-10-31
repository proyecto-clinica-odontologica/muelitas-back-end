import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epicrisis } from './entities/epicrisis.entity';
import { EpicrisisController } from './epicrisis.controller';
import { EpicrisisService } from './epicrisis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Epicrisis])],
  controllers: [EpicrisisController],
  providers: [EpicrisisService],
  exports: [TypeOrmModule, EpicrisisService],
})
export class EpicrisisModule {}
