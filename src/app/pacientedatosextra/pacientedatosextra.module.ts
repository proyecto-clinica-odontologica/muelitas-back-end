import { Module } from '@nestjs/common';
import { PacientedatosextraService } from './pacientedatosextra.service';
import { PacientedatosextraController } from './pacientedatosextra.controller';

@Module({
  controllers: [PacientedatosextraController],
  providers: [PacientedatosextraService],
})
export class PacientedatosextraModule {}
