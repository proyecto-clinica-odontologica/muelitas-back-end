import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticopresuntivoDto } from './create-diagnosticopresuntivo.dto';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDiagnosticopresuntivoDto {
    @IsString()
    @IsOptional()
    @Length(5, 60, {
        message:
        'El diagnostico presuntivo debe tener entre $constraint1 y $constraint2 caracteres',
    })
    Diagnostico?: string;

    @IsNumber()
    @IsOptional()
    IdPaciente?: number;
}
