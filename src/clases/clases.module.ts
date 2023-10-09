import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosModule } from 'src/cursos/cursos.module';
import { DocentesModule } from 'src/docentes/docentes.module';
import { PeriodosModule } from 'src/periodos/periodos.module';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { Clase } from './entities/clase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clase]),
    DocentesModule,
    PeriodosModule,
    CursosModule,
  ],
  controllers: [ClasesController],
  providers: [ClasesService],
  exports: [TypeOrmModule, ClasesService],
})
export class ClasesModule {}
