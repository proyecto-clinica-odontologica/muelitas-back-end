import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoController } from './diagnostico.controller';
import { Diagnostico } from './entities/diagnostico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostico]), AuthModule],
  controllers: [DiagnosticoController],
  providers: [DiagnosticoService],
  exports: [TypeOrmModule, DiagnosticoService],
})
export class DiagnosticoModule {}
