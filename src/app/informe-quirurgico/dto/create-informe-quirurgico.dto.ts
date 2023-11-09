import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateInformeQuirurgicoDto {
  @IsString({ message: 'La propiedad Nombre debe contener solo letras' })
  @IsNotEmpty({ message: 'La propiedad Nombre es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Nombre debe contener entre $constraint1 y $constraint2 caracteres' })
  Nombre: string;

  @IsString({ message: 'La propiedad Detalle debe contener solo letras' })
  @IsNotEmpty({ message: 'La propiedad Detalle es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Detalle debe contener entre $constraint1 y $constraint2 caracteres' })
  Detalle: string;

  @IsNotEmpty({ message: 'La propiedad CirugiaId es obligatorio' })
  @IsInt({ message: 'La propiedad CirugiaId debe ser un entero' })
  CirugiaId: number;
}
