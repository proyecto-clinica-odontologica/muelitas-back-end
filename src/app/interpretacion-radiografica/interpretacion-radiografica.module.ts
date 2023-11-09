import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CirugiaModule } from '../cirugia/cirugia.module';
import { InterpretacionRadiografica } from './entities/interpretacion-radiografica.entity';
import { InterpretacionRadiograficaController } from './interpretacion-radiografica.controller';
import { InterpretacionRadiograficaService } from './interpretacion-radiografica.service';

@Module({
  imports: [TypeOrmModule.forFeature([InterpretacionRadiografica]), CirugiaModule],
  controllers: [InterpretacionRadiograficaController],
  providers: [InterpretacionRadiograficaService],
  exports: [TypeOrmModule, InterpretacionRadiograficaService],
})
export class InterpretacionRadiograficaModule {}
