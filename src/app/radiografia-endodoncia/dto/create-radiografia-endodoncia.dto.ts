import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRadiografiaEndodonciaDto {
  @IsDate({ message: 'La propiedad Fecha debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La propiedad Fecha es obligatoria' })
  Fecha: Date;

  @IsString({ message: 'La propiedad Foto debe ser solo letras' })
  @IsNotEmpty({ message: 'La propiedad Foto es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Foto debe tener entre $constraint1 y $constraint2 caracteres' })
  Foto: string;

  @IsString({ message: 'La propiedad Interpretacion debe ser solo letras' })
  @IsNotEmpty({ message: 'La propiedad Interpretacion es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Interpretacion debe tener entre $constraint1 y $constraint2 caracteres' })
  Interpretacion: string;

  @IsDate({ message: 'La propiedad FechaRegistro debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La propiedad FechaRegistro es obligatoria' })
  FechaRegistro: Date;

  @IsInt({ message: 'La propiedad EndodonciaId debe ser un numero entero' })
  @IsNotEmpty({ message: 'La propiedad EndodonciaId es obligatoria' })
  EndodonciaId: number;
}
