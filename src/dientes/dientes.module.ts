import { Module } from '@nestjs/common';
import { DientesController } from './dientes.controller';
import { DientesService } from './dientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diente } from './diente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diente])],    // nos comunicamos con entidad Diente, para usar las bases de datos
  providers: [DientesService],
  controllers: [DientesController],
  exports:[DientesService]
})

export class DientesModule {}