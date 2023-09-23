import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @IsString({
    message: 'El numDocumento (número de documento) debe ser un texto',
  })
  @MinLength(8, {
    message:
      'El numDocumento (número de documento) debe tener como minimo 8 caracteres',
  })
  @MaxLength(8, {
    message:
      'El numDocumento (número de documento) debe tener como maximo 8 caracteres',
  })
  numDocumento: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(30, { message: 'El nombre debe tener como maximo 30 caracteres' })
  nombre: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
  @MaxLength(30, {
    message: 'El apellido debe tener como maximo 30 caracteres',
  })
  apellido: string;
}
