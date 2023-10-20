import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguimientoDto } from './create-seguimiento.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

//export class UpdateSeguimientoDto extends PartialType(CreateSeguimientoDto) {}
export class UpdateSeguimientoDto{

    @IsString()
    @MinLength(5)
    @IsOptional()
    seguimiento_nombre?: string;
}