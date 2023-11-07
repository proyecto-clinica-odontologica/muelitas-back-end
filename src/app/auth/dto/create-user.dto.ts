import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Debe ser un correo electrónico valido' })
  Correo: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  Contra: string;

  @Length(6, 20, {
    message: 'El número de documento debe tener entre 6 y 20 caracteres',
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
  Celular: string;

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
  @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
  TipoDocumento: string;

  @IsIn(['masculino', 'femenino'], {
    message: 'Los generos disponibles son [masculino o femenino]',
  })
  @IsNotEmpty({ message: 'El genero es obligatorio' })
  Genero: string;

  @IsIn(['desactivado', 'activado'], {
    message: 'Los estados de restablecer contra disponibles son [desactivado o activado]',
  })
  RestablecerContra?: string;

  @IsIn(['pagado', 'no pagado'], {
    message: 'Los estados disponibles son [pagado o no pagado]',
  })
  Pago?: string;

  @IsBoolean({ message: 'El estado ("Activo") debe ser true o false' })
  Activo?: boolean;

  @IsOptional()
  @IsNumber()
  SedeId: number;
}
