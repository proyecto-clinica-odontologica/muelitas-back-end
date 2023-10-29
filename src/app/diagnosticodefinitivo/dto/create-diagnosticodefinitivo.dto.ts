import { IsNumber, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateDiagnosticodefinitivoDto{
    @IsString()
    @IsNotEmpty()
    @Length(5, 60, {
        message:
        'El diagnostico definitivo debe tener entre $constraint1 y $constraint2 caracteres',
    })
    Diagnostico: string;

    @IsNotEmpty()
    @IsNumber()
    IdPaciente: number;
}
