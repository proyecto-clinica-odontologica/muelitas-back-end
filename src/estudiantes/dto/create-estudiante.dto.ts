import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @Length(3, 250, {
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
      'La rubrica debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  Firma: string;

  @IsOptional()
  usuario?: User;
}
