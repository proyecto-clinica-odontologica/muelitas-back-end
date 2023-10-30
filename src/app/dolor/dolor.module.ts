import { Module } from '@nestjs/common';
import { DolorService } from './dolor.service';
import { DolorController } from './dolor.controller';

@Module({
  controllers: [DolorController],
  providers: [DolorService],
})
export class DolorModule {}
