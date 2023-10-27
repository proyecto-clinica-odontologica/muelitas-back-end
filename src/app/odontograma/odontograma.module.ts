import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from '../paciente/paciente.module';
import { Odontograma } from './entities/odontograma.entity';
import { OdontogramaController } from './odontograma.controller';
import { OdontogramaService } from './odontograma.service';

@Module({
  imports: [TypeOrmModule.forFeature([Odontograma]), PacienteModule],
  controllers: [OdontogramaController],
  providers: [OdontogramaService],
  exports: [TypeOrmModule, OdontogramaService],
})
export class OdontogramaModule {}
