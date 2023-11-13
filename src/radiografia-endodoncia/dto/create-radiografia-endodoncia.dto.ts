import { IsOptional, IsString, IsDecimal, IsNumber, MaxLength, MinLength, IsInt } from 'class-validator';


export class CreateRadiografiaEndodonciaDto {

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Fecha: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    Foto: string;
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    Interpretacion: string;
    
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(10)
    FechaRegistro: string;
}
