import { IsOptional, IsString, IsDecimal,IsInt, IsNumber,MaxLength, MinLength } from 'class-validator';

export class CreateExamenEstomatologicoDto {

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Facie: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Craneo: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Cara: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    SimetriaTresTercios: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    SimetriaBilateral: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    SimetriaPerfil: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    ATMtrayectoriaaperturaycierre: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    ATMfluidosdelaATM: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    ATMpalpitacion: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    ATMgradodeapertura: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Ganglios: string;


}
