import { IsOptional, IsString, IsDecimal,IsInt, IsNumber,MaxLength, MinLength } from 'class-validator';
export class CreateOdontogramaDto {

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Nombre: string;

    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(20)
    Estado: string;

    @IsInt()
    Numero: number;

}
