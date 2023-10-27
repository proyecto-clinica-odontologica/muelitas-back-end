import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasosclinicosController } from './casosclinicos.controller';
import { CasosclinicosService } from './casosclinicos.service';
import { CasoClinico } from './entities/casoclinico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CasoClinico])],
  controllers: [CasosclinicosController],
  providers: [CasosclinicosService],
  exports: [TypeOrmModule, CasosclinicosService],
})
export class CasosclinicosModule {}
