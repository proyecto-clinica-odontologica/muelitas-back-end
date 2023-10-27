import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateCasoclinicoDto {
  @IsNotEmpty()
  @Length(5, 60, {
    message:
      'El caso clínico debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'El caso clinico solo puede contener letras.',
  })
  Nombre: string;
}