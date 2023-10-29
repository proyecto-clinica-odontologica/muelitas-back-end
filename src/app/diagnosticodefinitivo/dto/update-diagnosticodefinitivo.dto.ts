import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticodefinitivoDto } from './create-diagnosticodefinitivo.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDiagnosticodefinitivoDto{
    @IsString()
    @IsOptional()
    @Length(5, 60, {
        message:
        'El diagnostico definitivo debe tener entre $constraint1 y $constraint2 caracteres',
    })
    Diagnostico?: string;

    @IsNumber()
    @IsOptional()
    IdPaciente?: number;
}
