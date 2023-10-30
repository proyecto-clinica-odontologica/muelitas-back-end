import { Module } from '@nestjs/common';
import { ExamenestomatologicoService } from './examenestomatologico.service';
import { ExamenestomatologicoController } from './examenestomatologico.controller';

@Module({
  controllers: [ExamenestomatologicoController],
  providers: [ExamenestomatologicoService],
})
export class ExamenestomatologicoModule {}
