import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocentesController } from './docentes.controller';
import { DocentesService } from './docentes.service';
import { Docente } from './entities/docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [DocentesController],
  providers: [DocentesService],
  exports: [TypeOrmModule, DocentesService],
})
export class DocentesModule {}
