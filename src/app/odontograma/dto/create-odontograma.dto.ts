import { IsInt, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateOdontogramaDto {
  @IsString({ message: 'el campo nombre debe ser string' })
  @MinLength(3)
  Nombre: string;

  @IsString({ message: 'el campo nombre debe ser string' })
  @MinLength(3)
  Estado: string;

  @IsInt()
  @Min(1)
  Numero: number;

  @IsNotEmpty()
  @IsNumber()
  IdPaciente: number;
}
