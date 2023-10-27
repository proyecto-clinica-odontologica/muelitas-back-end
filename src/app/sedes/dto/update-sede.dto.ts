import { IsEmail, IsIn, IsInt, IsOptional, Length, Matches } from 'class-validator';

export class UpdateSedeDto {
  @IsOptional()
  @IsInt()
  id: number;

  @Length(3, 30, { message: 'El nombre debe tener entre 3 y 30 caracteres' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El nombre debe contener solo letras' })
  @IsOptional()
  Nombre?: string;

  @Length(3, 50, { message: 'La dirección debe tener entre 3 y 30 caracteres' })
  @IsOptional()
  Direccion?: string;

  @Length(9, 9, { message: 'El celular debe tener 9 digitos' })
  @Matches(/^[0-9]*$/, {
    message: 'El celular debe ser solo números',
  })
  @IsOptional()
  Celular?: string;

  @IsEmail({}, { message: 'Debe ser un correo electrónico valido' })
  @IsOptional()
  Correo?: string;

  @IsOptional()
  @IsIn(['principal', 'sucursal'], {
    message: 'tipo de sede solo puede ser principal o sucursal',
  })
  TipoSede?: string;

  @IsInt()
  @IsOptional()
  EmpresaId?: number;
}
