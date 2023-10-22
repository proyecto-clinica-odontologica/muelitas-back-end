import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';
import { TratamientoController } from './tratamiento.controller';
import { TratamientoService } from './tratamiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tratamiento])],
  controllers: [TratamientoController],
  providers: [TratamientoService],
  exports: [TypeOrmModule, TratamientoService],
})
export class TratamientoModule {}
