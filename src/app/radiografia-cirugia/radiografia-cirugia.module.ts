import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CirugiaModule } from '../cirugia/cirugia.module';
import { RadiografiaCirugia } from './entities/radiografia-cirugia.entity';
import { RadiografiaCirugiaController } from './radiografia-cirugia.controller';
import { RadiografiaCirugiaService } from './radiografia-cirugia.service';

@Module({
  imports: [TypeOrmModule.forFeature([RadiografiaCirugia]), CirugiaModule],
  controllers: [RadiografiaCirugiaController],
  providers: [RadiografiaCirugiaService],
  exports: [TypeOrmModule, RadiografiaCirugiaService],
})
export class RadiografiaCirugiaModule {}
