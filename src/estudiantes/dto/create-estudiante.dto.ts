import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @Length(3, 60, {
    message:
      'El nombre debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'El nombre solo puede contener letras.',
  })
  NombreCompleto: string;

  @IsNotEmpty()
  @Length(8, 8, {
    message: 'El dni debe tener $constraint1 caracteres.',
  })
  @Matches(/^[0-9]*$/, {
    message: 'El dni solo puede contener numeros.',
  })
  dni: string;

  @IsNotEmpty()
  @Length(3, 60, {
    message:
      'La rubrica debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  Rubrica: string;
}
