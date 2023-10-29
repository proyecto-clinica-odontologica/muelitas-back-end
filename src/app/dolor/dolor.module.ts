import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DolorController } from './dolor.controller';
import { DolorService } from './dolor.service';
import { Dolor } from './entities/dolor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dolor])],
  controllers: [DolorController],
  providers: [DolorService],
  exports: [TypeOrmModule, DolorService],
})
export class DolorModule {}
