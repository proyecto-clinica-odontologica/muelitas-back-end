import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruebaController } from './prueba.controller';
import { PruebaService } from './prueba.service';

@Module({
  imports: [TypeOrmModule.forFeature([PruebaModule])],
  controllers: [PruebaController],
  providers: [PruebaService],
  exports: [TypeOrmModule, PruebaService],
})
export class PruebaModule {}
