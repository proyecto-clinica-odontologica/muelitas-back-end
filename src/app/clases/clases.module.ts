import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosModule } from '../cursos/cursos.module';
import { DocentesModule } from '../docentes/docentes.module';
import { PeriodosModule } from '../periodos/periodos.module';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { Clase } from './entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase]), DocentesModule, PeriodosModule, CursosModule],
  controllers: [ClasesController],
  providers: [ClasesService],
  exports: [TypeOrmModule, ClasesService],
})
export class ClasesModule {}
