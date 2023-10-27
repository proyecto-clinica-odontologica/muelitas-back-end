import { IsEmail, IsOptional, Length, Matches } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'El correo debe ser un correo electrónico valido' })
  @IsOptional()
  Correo?: string;

  @Length(9, 9, { message: 'El numero de celular debe tener 9 digitos' })
  @Matches(/^[0-9]*$/, {
    message: 'El numero de celular debe ser solo numeros',
  })
  @IsOptional()
  Celular?: string;

  @Length(6, 20, {
    message: 'La contra (contraseña) debe tener entre 6 y 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contra (contraseña) debe tener mayúsculas , minúsculas y un número',
  })
  Contra: string;
}
