import { IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateSeguimientoDto {
    @IsString({message: 'El nombre debe ser de tipo string'})
    @Length(3, 255, {message: 'El nombre debe tener entre $constraint1 y $constraint2 caracteres.'})
    Nombre: string;

    @IsNotEmpty()
    @IsInt()
    IdCita?: number;
}
