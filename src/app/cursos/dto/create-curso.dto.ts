import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  @IsString({ message: 'El nombre debe ser un texto' })
  Nombre: string;

  @IsNotEmpty({ message: 'El semestre es obligatorio' })
  @IsString({ message: 'El semestre debe ser un texto' })
  Semestre: string;

  @IsString({ message: 'La malla debe ser un texto' })
  @IsNotEmpty({ message: 'La malla es obligatorio' })
  Malla: string;
}
