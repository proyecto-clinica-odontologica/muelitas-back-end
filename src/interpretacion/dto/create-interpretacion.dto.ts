import { IsOptional, IsString, IsDecimal,IsInt, IsDate,IsNumber,MaxLength, MinLength } from 'class-validator';
import { isDate } from 'util/types';

export class CreateInterpretacionDto {

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    RadiografiaPanoramica: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    HemogramaCompleto: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    TiempoSangrado: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    TiempoCuagulacion: string;

    @IsDate({ message: 'el campo nombre debe ser string' })
    FechaRegistro: Date;

}
