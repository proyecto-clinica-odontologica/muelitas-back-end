import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarasdienteDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsString()
  @IsNotEmpty()
  Lado1: string;

  @IsString()
  @IsNotEmpty()
  Lado2: string;

  @IsString()
  @IsNotEmpty()
  Lado3: string;

  @IsString()
  @IsNotEmpty()
  Lado4: string;

  @IsString()
  @IsNotEmpty()
  Lado5: string;

  @IsString()
  @IsNotEmpty()
  Lado6: string;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  IdMapeo: number;
}
