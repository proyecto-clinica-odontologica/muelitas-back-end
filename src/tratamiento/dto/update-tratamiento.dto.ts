import { PartialType } from '@nestjs/mapped-types';
import { CreateTratamientoDto } from './create-tratamiento.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

//export class UpdateTratamientoDto extends PartialType(CreateTratamientoDto) {}
export class UpdateTratamientoDto {
    @IsString()
    @MinLength(5)
    @IsOptional()
    tratamiento_nombre?: string;
}