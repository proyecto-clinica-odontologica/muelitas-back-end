import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CirugiaModule } from '../cirugia/cirugia.module';
import { EstadoPostquirurgico } from './entities/estado-postquirurgico.entity';
import { EstadoPostquirurgicoController } from './estado-postquirurgico.controller';
import { EstadoPostquirurgicoService } from './estado-postquirurgico.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPostquirurgico]), CirugiaModule],
  controllers: [EstadoPostquirurgicoController],
  providers: [EstadoPostquirurgicoService],
  exports: [TypeOrmModule, EstadoPostquirurgicoService],
})
export class EstadoPostquirurgicoModule {}
