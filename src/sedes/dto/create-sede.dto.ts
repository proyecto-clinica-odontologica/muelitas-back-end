import { IsEmail, IsIn, IsInt, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateSedeDto {
  @Length(3, 30, { message: 'El nombre debe tener entre 3 y 30 caracteres' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El nombre debe contener solo letras' })
  Nombre: string;

  @IsNotEmpty()
  @Length(3, 50, { message: 'La dirección debe tener entre 3 y 30 caracteres' })
  Direccion: string;

  @IsNotEmpty()
  @Length(9, 9, { message: 'El celular debe tener 9 digitos' })
  @Matches(/^[0-9]*$/, {
    message: 'El celular debe ser solo números',
  })
  Celular: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Debe ser un correo electrónico valido' })
  Correo: string;

  @IsNotEmpty()
  @IsIn(['principal', 'sucursal'], {
    message: 'tipo de sede solo puede ser principal o sucursal',
  })
  TipoSede: string;

  @IsNotEmpty()
  @IsInt()
  idEmpresa: number;
}
