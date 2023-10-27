import { IsNotEmpty, IsNumber, Length, Matches } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'El nombre solo puede contener letras',
  })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  Nombre: string;

  @IsNotEmpty({ message: 'El semestre es obligatorio' })
  @IsNumber({}, { message: 'El semestre debe ser un numero' })
  Semestre: number;

  @IsNotEmpty({ message: 'La malla es obligatorio' })
  @IsNumber({}, { message: 'La malla debe ser un numero' })
  Malla: number;
}
