import { PartialType } from '@nestjs/mapped-types';
import { CreateAnamnesisDto } from './create-anamnesis.dto';
import { IsNumber, IsOptional, Length } from 'class-validator';

export class UpdateAnamnesisDto{
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
