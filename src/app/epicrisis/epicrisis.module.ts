import { Module } from '@nestjs/common';
import { EpicrisisService } from './epicrisis.service';
import { EpicrisisController } from './epicrisis.controller';

@Module({
  controllers: [EpicrisisController],
  providers: [EpicrisisService],
})
export class EpicrisisModule {}
