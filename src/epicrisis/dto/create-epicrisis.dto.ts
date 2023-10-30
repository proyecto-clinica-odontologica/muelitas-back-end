import { IsOptional, IsString, IsDecimal,IsInt,IsDate, IsNumber,MaxLength, MinLength } from 'class-validator';
import { isDate } from 'util/types';


export class CreateEpicrisisDto {
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Contenido: string;

    @IsDate()
    FechaRegistro: Date;


}
