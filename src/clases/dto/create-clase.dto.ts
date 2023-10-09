import { IsInt, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateClaseDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 60, {
    message:
      'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
  })
  Nombre: string;

  @IsString()
  @Matches(/^[A-Z]\d{3}$/, {
    message:
      'El salon debe empezar con una letra mayuscula y terminar con 3 numeros',
  })
  Salon: string;

  @IsString()
  @Matches(/^[A-Z][a-z]{2,} [A-Z][a-z]{2,}$/, {
    message:
      'El horario debe empezar con 2 palabras con la primera letra mayuscula y un espacio entre ellas',
  })
  Horario: string;

  @IsNotEmpty()
  @IsInt()
  idDocente: number;

  @IsNotEmpty()
  @IsInt()
  idPeriodo: number;

  @IsNotEmpty()
  @IsInt()
  idCurso: number;
}
