import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { IntegrantesController } from './integrantes.controller';
import { IntegrantesService } from './integrantes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Integrante])],
  controllers: [IntegrantesController],
  providers: [IntegrantesService],
  exports: [TypeOrmModule, IntegrantesService],
})
export class IntegrantesModule {}
