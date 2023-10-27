import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateIntegranteDto {
  @IsNotEmpty()
  @IsInt()
  IdEstudiante: number;

  @IsNotEmpty()
  @IsInt()
  IdClase: number;
}
