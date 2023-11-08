import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndodonciaModule } from '../endodoncia/endodoncia.module';
import { PreparacionQuimica } from './entities/preparacion-quimica.entity';
import { PreparacionQuimicaController } from './preparacion-quimica.controller';
import { PreparacionQuimicaService } from './preparacion-quimica.service';

@Module({
  imports: [TypeOrmModule.forFeature([PreparacionQuimica]), EndodonciaModule],
  controllers: [PreparacionQuimicaController],
  providers: [PreparacionQuimicaService],
  exports: [TypeOrmModule, PreparacionQuimicaService],
})
export class PreparacionQuimicaModule {}
