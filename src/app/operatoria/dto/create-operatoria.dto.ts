import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOperatoriaDto {
  @IsString({ message: 'La propiedad MotivoConsulta debe ser un string' })
  @IsNotEmpty({ message: 'La propiedad MotivoConsulta es obligatorio' })
  @Length(3, 255, { message: 'La propiedad MotivoConsulta debe tener entre $constraint1 y $constraint2 caracteres' })
  MotivoConsulta: string;

  @IsString({ message: 'La propiedad DiagnosticoDefinitivo debe ser un string' })
  @IsNotEmpty({ message: 'La propiedad DiagnosticoDefinitivo es obligatorio' })
  @Length(3, 255, { message: 'La propiedad DiagnosticoDefinitivo debe tener entre $constraint1 y $constraint2 caracteres' })
  DiagnosticoDefinitivo: string;

  @IsInt({ message: 'La propiedad PacienteId debe ser un entero' })
  @IsNotEmpty({ message: 'La propiedad PacienteId es obligatorio' })
  PacienteId: number;
}
