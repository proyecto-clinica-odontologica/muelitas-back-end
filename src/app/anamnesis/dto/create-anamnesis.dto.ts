import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Matches } from 'class-validator';
export class CreateAnamnesisDto{
    @IsString()
    @IsNotEmpty()
    @Length(5, 60, {
        message:
        'El contenido debe tener entre $constraint1 y $constraint2 caracteres',
    })
    Contenido: string;

    @IsNotEmpty()
    @IsNumber()
    IdPaciente: number;
}