import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDiagnosticoDto {
  @IsString({ message: 'La propiedad Tipo debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Tipo es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Tipo debe tener entre $constraint1 y $constraint2 caracteres' })
  Tipo: string;

  @IsString({ message: 'La propiedad Version debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Version es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Version debe tener entre $constraint1 y $constraint2 caracteres' })
  Version: string;

  @IsString({ message: 'La propiedad Codigo debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Codigo es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Codigo debe tener entre $constraint1 y $constraint2 caracteres' })
  Codigo: string;

  @IsString({ message: 'La propiedad Resumen debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Resumen es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Resumen debe tener entre $constraint1 y $constraint2 caracteres' })
  Resumen: string;

  @IsString({ message: 'La propiedad Detalle debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Detalle es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Detalle debe tener entre $constraint1 y $constraint2 caracteres' })
  Detalle: string;
}
