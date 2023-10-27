import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMapeoDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  IdOdontograma: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  IdCasoDiente: number;
}
