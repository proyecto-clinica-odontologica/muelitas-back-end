import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Debe ser un correo electrónico valido' })
  Correo: string;

  @Length(6, 20, {
    message: 'La contraseña debe tener entre 6 y 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayúsculas , minúsculas y un número',
  })
  Contra: string;

  @Length(8, 8, {
    message: 'El número de documento debe tener 8 caracteres',
  })
  @Matches(/^[0-9]*$/, {
    message: 'El número de documento debe ser solo números',
  })
  NumDoc: string;

  @Length(3, 30, { message: 'El nombre debe tener entre 3 y 30 caracteres' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El nombre debe contener solo letras' })
  Nombre: string;

  @Length(3, 30, { message: 'El apellido debe tener entre 3 y 30 caracteres' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El apellido debe ser solo letras' })
  Apellido: string;

  @Length(9, 9, { message: 'El celular debe tener 9 digitos' })
  @Matches(/^[0-9]*$/, {
    message: 'El celular debe ser solo números',
  })
  @IsOptional()
  Celular?: string;

  @IsString({ message: 'La foto debe ser un texto' })
  @IsOptional()
  Foto?: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'El codigo debe ser alfanumerico sin caracteres especiales',
  })
  Codigo?: string;

  @IsIn(['god', 'admin', 'docente', 'estudiante'], {
    message: 'Los roles disponibles son [god, admin, docente o estudiante]',
  })
  @IsOptional()
  Rol?: string;
}
