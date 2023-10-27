import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCitaDto {
  @IsNotEmpty()
  @IsInt()
  IdTratamiento: number;

  @IsNotEmpty()
  @IsInt()
  IdPaciente: number;

  @IsNotEmpty()
  @IsInt()
  IdEstudiante: number;
}
