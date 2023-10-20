import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCitaDto {
    @IsNumber()
    paciente_id: number;
    @IsNumber()
    estudiante_id: number;
    @IsString()
    @IsOptional()
    tratamiento?: string;
}
