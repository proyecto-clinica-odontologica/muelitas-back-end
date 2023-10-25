import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasModule } from '../empresas/empresas.module';
import { Sede } from './entities/sede.entity';
import { SedesController } from './sedes.controller';
import { SedesService } from './sedes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sede]), EmpresasModule],
  controllers: [SedesController],
  providers: [SedesService],
  exports: [TypeOrmModule, SedesService],
})
export class SedesModule {}
