import { IsOptional, IsString, IsDecimal, IsNumber,MaxLength, MinLength, IsInt } from 'class-validator';
export class CreatePacienteDto {
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Nombre: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    ApellidoPaterno: string;


    @IsString({ message: 'el campo nombre debe ser string' })   
    @MinLength(3)
    @MaxLength(20)
    ApellidoMaterno: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    FechaNacimiento: string;

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    Genero: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    Celular: string;
    
    @IsInt()
    Edad: number;

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    Correo: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    TipoDoc: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(8)
    NumeroDocumento: string;

    
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    EstadoCivil: string;

    
    @IsString()
    @MinLength(3)
    @MaxLength(25)
    Ocupacion: string;

    
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    GradoDeInstruccion: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    Domicilio: string;

    
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    Acompaniante: string;

    
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    Parentesco: string;

    
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    AntecedentePatologico: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    AntecedentePersonal: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    AntecedenteFamiliar: string;
    
    @IsNumber()
    Peso: number;

    @IsNumber()
    Talla: number;

    @IsNumber()
    IMC: number;

    @IsString()
    @MinLength(3)
    @MaxLength(40)
    Alergias: string;

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    Piel: string;

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    Unias: string;

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    Cabello: string;
}