import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCirugiaDto {
  @IsString({ message: 'La propiedad MotivoConsulta debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad MotivoConsulta es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  MotivoConsulta: string;

  @IsString({ message: 'La propiedad DiagnosticoCIE11 debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad DiagnosticoCIE11 es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  DiagnosticoCIE11: string;

  @IsString({ message: 'La propiedad Pronostico debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Pronostico es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  Pronostico: string;

  @IsString({ message: 'La propiedad PlandeTrabajo debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad PlandeTrabajo es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  PlandeTrabajo: string;

  @IsString({ message: 'La propiedad Cirujano debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Cirujano es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  Cirujano: string;

  @IsString({ message: 'La propiedad Asistente debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Asistente es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  Asistente: string;

  @IsString({ message: 'La propiedad Circulante debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Circulante es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  Circulante: string;

  @IsString({ message: 'La propiedad HoraInicioCx debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad HoraInicioCx es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  HoraInicioCx: string;

  @IsString({ message: 'La propiedad HoraTerminoCx debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad HoraTerminoCx es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  HoraTerminoCx: string;

  @IsDate({ message: 'La propiedad FechaAlta debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La propiedad FechaAlta es obligatorio' })
  FechaAlta: Date;

  @IsString({ message: 'La propiedad Observaciones debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Observaciones es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  Observaciones: string;

  @IsString({ message: 'La propiedad EvolucionDiaria debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad EvolucionDiaria es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  EvolucionDiaria: string;

  @IsString({ message: 'La propiedad EstudianteCargo debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad EstudianteCargo es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  EstudianteCargo: string;

  @IsString({ message: 'La propiedad FacultativoCargo debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad FacultativoCargo es obligatorio' })
  @Length(3, 255, { message: 'La propiedad debe tener entre $constraint1 y $constraint2 caracteres' })
  FacultativoCargo: string;

  @IsInt({ message: 'La propiedad PacienteId debe ser un numero entero' })
  @IsNotEmpty({ message: 'La propiedad PacienteId es obligatorio' })
  PacienteId: number;
}
