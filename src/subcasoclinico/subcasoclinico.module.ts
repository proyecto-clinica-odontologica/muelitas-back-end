import { Module } from '@nestjs/common';
import { SubcasoclinicoController } from './subcasoclinico.controller';
import { SubcasoclinicoService } from './subcasoclinico.service';

@Module({
  controllers: [SubcasoclinicoController],
  providers: [SubcasoclinicoService]
})
export class SubcasoclinicoModule {}
