import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcasoclinicoController } from './subcasoclinico.controller';
import { SubcasoclinicoService } from './subcasoclinico.service';
import { SubCasoClinico } from './entities/subcasoclinico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCasoClinico])],
  controllers: [SubcasoclinicoController],
  providers: [SubcasoclinicoService],
  exports: [TypeOrmModule, SubcasoclinicoService],
})
export class SubcasoclinicoModule {}

