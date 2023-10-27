import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateEstudianteDto {
  // @IsNotEmpty()
  // @Length(3, 250, {
  //   message:
  //     'El nombre debe tener entre $constraint1 y $constraint2 caracteres.',
  // })
  // @Matches(/^[a-zA-Z\s]*$/, {
  //   message: 'El nombre solo puede contener letras.',
  // })
  // NombreCompleto: string;

  @IsNotEmpty()
  @Length(3, 60, {
    message:
      'La rubrica debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  Firma: string;

  @IsNotEmpty()
  @IsInt()
  idUsuario: number;
}
