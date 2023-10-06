import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorController } from './administrador.controller';
import { AdministradorService } from './administrador.service';
import { Administrador } from './entities/administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [AdministradorController],
  providers: [AdministradorService],
  exports: [TypeOrmModule, AdministradorService],
})
export class AdministradorModule {}
