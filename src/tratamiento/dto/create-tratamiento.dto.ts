import { IsString, MinLength } from "class-validator";

export class CreateTratamientoDto {
    @IsString()
    @MinLength(5)
    tratamiento_nombre: string;
}
