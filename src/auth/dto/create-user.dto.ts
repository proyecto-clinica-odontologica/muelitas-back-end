import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo debe ser un correo electrónico valido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, {
    message: 'La contraseña debe tener como minimo 6 caracteres',
  })
  @MaxLength(50, { message: 'la contraseña debe tener menos de 50 caracteres' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayúsculas, minúsculas y un número',
  })
  password: string;

  @IsString({ message: 'El nombre completo debe ser un texto' })
  @MinLength(3, {
    message: 'El nombre completo debe tener como minimo 3 caracteres',
  })
  fullName: string;
}
