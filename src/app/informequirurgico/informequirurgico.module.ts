import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { InformequirurgicoService } from './informequirurgico.service';
import { InformequirurgicoController } from './informequirurgico.controller';
import { InfQuirurgico } from './entities/infquirurgico.entity';
@Module({
  imports: [TypeOrmModule.forFeature([InfQuirurgico]), AuthModule],
  controllers: [InformequirurgicoController],
  providers: [InformequirurgicoService],
  exports: [TypeOrmModule, InformequirurgicoService],
})
export class InformequirurgicoModule {}
