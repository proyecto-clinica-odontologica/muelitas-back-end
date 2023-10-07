import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CreateIntegranteDto {
  @IsNotEmpty()
  @IsNumber()
  IdEstudiante: number;

  @IsNotEmpty()
  @IsNumber()
  IdClase: number;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z]$/, {
    message: 'Combinado solo puede contener letras',
  })
  Combinado: string;
}
