import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'El nombre del representante solo puede contener letras',
  })
  @Length(3, 30, {
    message:
      'El nombre del representante debe tener entre $constraint1 y $constraint2',
  })
  Representante: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'La razon social solo puede contener letras',
  })
  @Length(3, 30, {
    message: 'La razon social debe tener entre $constraint1 y $constraint2',
  })
  RazonSocial: string;

  @IsNotEmpty()
  @Matches(/^[0-9]*$/, {
    message: 'El RUC solo puede contener numeros',
  })
  @Length(13, 13, {
    message: 'El RUC debe tener 13 digitos',
  })
  Ruc: string;
}
