
import { IsOptional, IsString, IsDecimal,IsInt, IsDate,IsNumber,MaxLength, MinLength } from 'class-validator';

export class CreateNotasEvolutivaDto {

    @IsDate({ message: 'el campo nombre debe ser string' })
    Fecha: Date;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Tratamiento: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Firma: string;



}
