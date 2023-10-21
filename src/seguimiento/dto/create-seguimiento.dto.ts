import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateSeguimientoDto {
    @IsString()
    @MinLength(5)
    seguimiento_nombre: string;
    @IsString()
    @IsOptional()
    cita?: number;
}
