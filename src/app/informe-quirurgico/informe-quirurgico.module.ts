import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CirugiaModule } from '../cirugia/cirugia.module';
import { InformeQuirurgico } from './entities/informe-quirurgico.entity';
import { InformeQuirurgicoController } from './informe-quirurgico.controller';
import { InformeQuirurgicoService } from './informe-quirurgico.service';

@Module({
  imports: [TypeOrmModule.forFeature([InformeQuirurgico]), CirugiaModule],
  controllers: [InformeQuirurgicoController],
  providers: [InformeQuirurgicoService],
  exports: [TypeOrmModule, InformeQuirurgicoService],
})
export class InformeQuirurgicoModule {}
