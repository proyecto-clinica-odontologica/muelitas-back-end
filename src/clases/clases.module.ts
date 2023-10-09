import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocentesModule } from 'src/docentes/docentes.module';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { Clase } from './entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase]), DocentesModule],
  controllers: [ClasesController],
  providers: [ClasesService],
  exports: [TypeOrmModule, ClasesService],
})
export class ClasesModule {}
