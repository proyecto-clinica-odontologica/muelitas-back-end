import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRadiografiaCirugiaDto {
  @IsNotEmpty({ message: 'La propiedad Fecha es obligatorio' })
  @IsDate({ message: 'La propiedad Fecha debe ser de tipo fecha' })
  Fecha: Date;

  @IsNotEmpty({ message: 'La propiedad Foto es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Foto debe tener entre $constraint1 y $constraint2 caracteres' })
  @IsString({ message: 'La propiedad Foto debe ser de tipo texto' })
  Foto: string;

  @IsNotEmpty({ message: 'La propiedad Nombre es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Nombre debe tener entre $constraint1 y $constraint2 caracteres' })
  @IsString({ message: 'La propiedad Nombre debe ser de tipo texto' })
  Nombre: string;

  @IsNotEmpty({ message: 'La propiedad Interpretacion es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Interpretacion debe tener entre $constraint1 y $constraint2 caracteres' })
  @IsString({ message: 'La propiedad Interpretacion debe ser de tipo texto' })
  Interpretacion: string;

  @IsNotEmpty({ message: 'La propiedad FechaRegistro es obligatorio' })
  @IsDate({ message: 'La propiedad FechaRegistro debe ser de tipo fecha' })
  FechaRegistro: Date;

  @IsInt({ message: 'La propiedad CirugiaId debe ser de tipo entero' })
  @IsNotEmpty({ message: 'La propiedad CirugiaId es obligatorio' })
  CirugiaId: number;
}
