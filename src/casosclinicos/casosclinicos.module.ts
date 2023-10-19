import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasoClinico } from './entities/casoclinico.entity';
import { CasosclinicosService } from './casosclinicos.service';
import { CasosclinicosController } from './casosclinicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CasoClinico])],
  controllers: [CasosclinicosController],
  providers: [CasosclinicosService],
  exports: [TypeOrmModule, CasosclinicosService],
})
export class CasosclinicosModule {}
