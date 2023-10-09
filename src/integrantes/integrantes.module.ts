import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasesModule } from 'src/clases/clases.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { Integrante } from './entities/integrante.entity';
import { IntegrantesController } from './integrantes.controller';
import { IntegrantesService } from './integrantes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Integrante]),
    EstudiantesModule,
    ClasesModule,
  ],
  controllers: [IntegrantesController],
  providers: [IntegrantesService],
  exports: [TypeOrmModule, IntegrantesService],
})
export class IntegrantesModule {}
