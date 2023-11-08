import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEstadoPostquirurgicoDto {
  @IsNotEmpty({ message: 'La propiedad Fecha es obligatorio' })
  @IsDate({ message: 'La propiedad Fecha debe ser una fecha valida' })
  Fecha: Date;

  @IsNotEmpty({ message: 'La propiedad Nombre es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Nombre debe tener entre $constraint1 y $constraint2 caracteres' })
  @IsString({ message: 'La propiedad Nombre debe contener solo caracteres' })
  Nombre: string;

  @IsNotEmpty({ message: 'La propiedad Detalle es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Detalle debe tener entre $constraint1 y $constraint2 caracteres' })
  @IsString({ message: 'La propiedad Detalle debe contener solo caracteres' })
  Detalle: string;

  @IsNotEmpty({ message: 'La propiedad CirujiaId es obligatorio' })
  @IsInt({ message: 'La propiedad CirujiaId debe ser un entero' })
  CirujiaId: number;
}
