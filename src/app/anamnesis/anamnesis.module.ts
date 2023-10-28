import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnamnesisController } from './anamnesis.controller';
import { AnamnesisService } from './anamnesis.service';
import { Anamnesis } from './entities/anamnesis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anamnesis])],
  controllers: [AnamnesisController],
  providers: [TypeOrmModule, AnamnesisService],
})
export class AnamnesisModule {}
