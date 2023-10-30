import { IsOptional, IsString, IsDate,IsDecimal, IsNumber,MaxLength, MinLength, IsInt } from 'class-validator';
import { isDate } from 'util/types';
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

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    FechaNacimiento: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    Genero: string;
    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    Celular: string;
    
    @IsInt()
    Edad: number;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    Correo: string;
    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    TipoDoc: string;
    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(8)
    NumeroDocumento: string;

    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    EstadoCivil: string;

    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(25)
    Ocupacion: string;

    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(15)
    GradoDeInstruccion: string;
    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(30)
    Domicilio: string;

    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Acompaniante: string;

    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    Parentesco: string;

    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    AntecedentePatologico: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    AntecedentePersonal: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    AntecedenteFamiliar: string;
    
    @IsNumber()
    Peso: number;

    @IsNumber()
    Talla: number;

    @IsNumber()
    IMC: number;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Alergias: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(15)
    Piel: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    Unias: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Cabello: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(30)
    EnfermedadActual: string;
    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(60)
    MotivoConsulta: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(60)
    FuncionesBiologicas: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Orina: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Apetito: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Sueño: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Deposiciones: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Sed: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Ectoscopia: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Lugar: string;
    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Raza: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Responsable: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    ParentescoConResponsable: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    DomicilioResponsable: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    CelularResponsable: string;

    @IsDate()
    FechaCreacion: Date;

    @IsDate()
    HoraCreacion: Date;
    
    @IsNumber()
    NumeroHistoriaclinica: number;
}