import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndodonciaModule } from '../endodoncia/endodoncia.module';
import { OpturacionConducto } from './entities/opturacion-conducto.entity';
import { OpturacionConductosController } from './opturacion-conductos.controller';
import { OpturacionConductosService } from './opturacion-conductos.service';

@Module({
  imports: [TypeOrmModule.forFeature([OpturacionConducto]), EndodonciaModule],
  controllers: [OpturacionConductosController],
  providers: [OpturacionConductosService],
  exports: [TypeOrmModule, OpturacionConductosService],
})
export class OpturacionConductosModule {}
