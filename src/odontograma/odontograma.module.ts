import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Odontograma } from './entities/odontograma.entity';
import { OdontogramaController } from './odontograma.controller';
import { OdontogramaService } from './odontograma.service';
import { PacienteModule } from 'src/paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Odontograma]), PacienteModule],
  controllers: [OdontogramaController],
  providers: [OdontogramaService],
  exports: [TypeOrmModule, OdontogramaService],
})
export class OdontogramaModule {}
