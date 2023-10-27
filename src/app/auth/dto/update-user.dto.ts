import { IsBoolean, IsEmail, IsIn, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsEmail({}, { message: 'Debe ser un correo electrónico valido' })
  @IsOptional()
  Correo?: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsOptional()
  Contra?: string;

  @Length(6, 20, {
    message: 'El número de documento debe tener entre 6 y 20 caracteres',
  })
  @Matches(/^[0-9]*$/, {
    message: 'El número de documento debe ser solo números',
  })
  @IsOptional()
  NumDoc?: string;

  @Length(3, 30, { message: 'El nombre debe tener entre 3 y 30 caracteres' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El nombre debe contener solo letras' })
  @IsOptional()
  Nombre?: string;

  @Length(3, 30, { message: 'El apellido debe tener entre 3 y 30 caracteres' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El apellido debe ser solo letras' })
  @IsOptional()
  Apellido?: string;

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

  @IsIn(['god', 'administrador', 'docente', 'estudiante'], {
    message: 'Los roles disponibles son [god, admin, docente o estudiante]',
  })
  @IsOptional()
  Rol?: string;

  @IsIn(['dni', 'pasaporte', 'carnet de extranjeria'], {
    message: 'Los tipos de documento disponibles son [dni, pasaporte o carnet de extranjeria]',
  })
  @IsOptional()
  TipoDocumento?: string;

  @IsIn(['masculino', 'femenino'], {
    message: 'Los generos disponibles son [masculino o femenino]',
  })
  @IsOptional()
  Genero?: string;

  @IsIn(['desactivado', 'activado'], {
    message: 'Los estados de restablecer contra disponibles son [desactivado o activado]',
  })
  @IsOptional()
  RestablecerContra?: string;

  @IsIn(['pagado', 'no pagado'], {
    message: 'Los estados disponibles son [pagado o no pagado]',
  })
  @IsOptional()
  Pago?: string;

  @IsBoolean({ message: 'El estado debe ser true o false' })
  @IsOptional()
  activo?: boolean;

  @IsOptional()
  @IsNumber()
  SedeId?: number;
}
