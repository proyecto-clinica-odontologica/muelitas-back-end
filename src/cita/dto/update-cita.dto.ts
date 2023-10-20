import { PartialType } from '@nestjs/mapped-types';
import { CreateCitaDto } from './create-cita.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

//export class UpdateCitaDto extends PartialType(CreateCitaDto) {}
export class UpdateCitaDto  {
    @IsNumber()
    @IsOptional()
    paciente_id?: number;
    @IsNumber()
    @IsOptional()
    estudiante_id?: number;
    @IsString()
    @IsOptional()
    tratamiento?: string;
}