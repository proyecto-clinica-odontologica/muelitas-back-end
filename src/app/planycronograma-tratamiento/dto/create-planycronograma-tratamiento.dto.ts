import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePlanycronogramaTratamientoDto {
  @IsString({ message: 'La propiedad Resumen debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Resumen no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Resumen debe tener entre $constraint1 y $constraint2 caracteres' })
  Resumen: string;

  @IsString({ message: 'La propiedad Especificaciones debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Especificaciones no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Especificaciones debe tener entre $constraint1 y $constraint2 caracteres' })
  Especificaciones: string;

  @IsString({ message: 'La propiedad Observaciones debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Observaciones no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Observaciones debe tener entre $constraint1 y $constraint2 caracteres' })
  Observaciones: string;

  @IsNotEmpty({ message: 'La propiedad PacienteId es obligatoria' })
  @IsInt({ message: 'La propiedad PacienteId debe ser de tipo numérico' })
  PacienteId: number;
}
