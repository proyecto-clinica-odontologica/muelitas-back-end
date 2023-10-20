import { Module } from '@nestjs/common';
import { OdontogramaService } from './odontograma.service';
import { OdontogramaController } from './odontograma.controller';

@Module({
  controllers: [OdontogramaController],
  providers: [OdontogramaService],
})
export class OdontogramaModule {}
