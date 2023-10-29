import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenesauxiliareDto } from './create-examenesauxiliare.dto';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateExamenesauxiliareDto {
    @IsString()
    @IsOptional()
    @Length(5, 60, {
        message:
        'El contenido debe tener entre $constraint1 y $constraint2 caracteres',
    })
    Contenido?: string;

    @IsOptional()
    @IsNumber()
    IdPaciente?: number;
}
