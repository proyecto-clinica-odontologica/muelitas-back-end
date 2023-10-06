import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateAdministradorDto {
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
  @Length(3, 60, {
    message:
      'El codigo de accceso debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  CodigoAcceso: string;
}
