import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatoriaModule } from '../operatoria/operatoria.module';
import { TecnicaRadiografica } from './entities/tecnica-radiografica.entity';
import { TecnicaRadiograficaController } from './tecnica-radiografica.controller';
import { TecnicaRadiograficaService } from './tecnica-radiografica.service';

@Module({
  imports: [TypeOrmModule.forFeature([TecnicaRadiografica]), OperatoriaModule],
  controllers: [TecnicaRadiograficaController],
  providers: [TecnicaRadiograficaService],
  exports: [TypeOrmModule, TecnicaRadiograficaService],
})
export class TecnicaRadiograficaModule {}
