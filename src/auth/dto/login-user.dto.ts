import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'El correo debe ser un correo electrónico valido' })
  correo: string;

  @MinLength(6, {
    message: 'La contra (contraseña) debe tener al menos 6 caracteres',
  })
  @MaxLength(20, {
    message: 'La contra (contraseña) debe tener como maximo 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contra (contraseña) debe tener mayúsculas , minúsculas y un número',
  })
  contra: string;
}
