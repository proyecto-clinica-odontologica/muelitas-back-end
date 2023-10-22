import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCasoClinico } from './entities/subcasoclinico.entity';
import { SubcasoclinicoController } from './subcasoclinico.controller';
import { SubcasoclinicoService } from './subcasoclinico.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCasoClinico])],
  controllers: [SubcasoclinicoController],
  providers: [SubcasoclinicoService],
  exports: [TypeOrmModule, SubcasoclinicoService],
})
export class SubcasoclinicoModule {}
