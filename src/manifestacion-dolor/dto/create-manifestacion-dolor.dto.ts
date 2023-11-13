
import { IsOptional, IsString, IsDecimal, IsNumber, MaxLength, MinLength, IsInt } from 'class-validator';

export class CreateManifestacionDolorDto {
    @IsString({ message: 'el campo nombre debe ser string' })
    @MinLength(3)
    @MaxLength(40)
    Nombre: string;

}
