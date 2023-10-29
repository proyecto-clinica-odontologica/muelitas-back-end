import { Module } from '@nestjs/common';
import { OclusionService } from './oclusion.service';
import { OclusionController } from './oclusion.controller';

@Module({
  controllers: [OclusionController],
  providers: [OclusionService],
})
export class OclusionModule {}
