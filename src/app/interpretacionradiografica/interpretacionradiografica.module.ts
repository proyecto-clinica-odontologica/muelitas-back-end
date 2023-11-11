import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { InterpretacionradiograficaService } from './interpretacionradiografica.service';
import { InterpretacionradiograficaController } from './interpretacionradiografica.controller';
import { InterpRad } from './entities/interprad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterpRad]), AuthModule],
  controllers: [InterpretacionradiograficaController],
  providers: [InterpretacionradiograficaService],
  exports: [TypeOrmModule, InterpretacionradiograficaService],
})
export class InterpretacionradiograficaModule {}
