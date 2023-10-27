import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateAdministradorDto {
  @IsNotEmpty()
  @Length(3, 60, {
    message:
      'El codigo de accceso debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  CodigoAcceso: string;

  @IsNotEmpty()
  @IsInt()
  idUsuario: number;
}
