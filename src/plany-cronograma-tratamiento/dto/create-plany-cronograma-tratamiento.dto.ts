import { IsOptional, IsString, IsDecimal,IsInt, IsDate,IsNumber,MaxLength, MinLength } from 'class-validator';


export class CreatePlanyCronogramaTratamientoDto {

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Resumen: string;
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Especificaciones: string;
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Observaciones: string;

}

