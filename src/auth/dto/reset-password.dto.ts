import { IsNotEmpty, Length, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'El token es requerido' })
  @Length(8, 8, { message: 'El token debe tener 8 caracteres' })
  RestablecerPasswordToken: string;

  @Length(6, 20, {
    message: 'La contraseña debe tener entre 6 y 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayúsculas , minúsculas y un número',
  })
  Contra: string;
}
