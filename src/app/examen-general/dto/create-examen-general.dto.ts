import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateExamenGeneralDto {
  @IsNumber({}, { message: 'El peso debe ser un número' })
  Peso: number;

  @IsNumber({}, { message: 'La talla debe ser un número' })
  Talla: number;

  @IsNumber({}, { message: 'El índice de masa corporal debe ser un número' })
  @IsNotEmpty({ message: 'El índice de masa corporal no debe estar vacío' })
  IndiceMasaCorporal: number;

  @IsNumber({}, { message: 'La propiedad piel debe ser un número' })
  @IsNotEmpty({ message: 'La propiedad piel no debe estar vacía' })
  Piel: string;

  @IsString({ message: 'La propiedad anexos cabello debe ser un string' })
  @IsNotEmpty({ message: 'La propiedad anexos cabello no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad anexos cabello debe tener entre $constraint1 y $constraint2 caracteres' })
  AnexosCabello: string;

  @IsString({ message: 'La propiedad anexos uñas debe ser un string' })
  @IsNotEmpty({ message: 'La propiedad anexos uñas no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad anexos uñas debe tener entre $constraint1 y $constraint2 caracteres' })
  AnexosUnias: string;

  @IsString({ message: 'La propiedad presión arterial debe ser un string' })
  @IsNotEmpty({ message: 'La propiedad presión arterial no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad presión arterial debe tener entre $constraint1 y $constraint2 caracteres' })
  PresionArterial: string;

  @IsNumber({}, { message: 'La frecuencia respiratoria debe ser un número' })
  @IsNotEmpty({ message: 'La frecuencia respiratoria no debe estar vacía' })
  FrecuenciaRespiratoria: number;

  @IsNumber({}, { message: 'El pulso debe ser un número' })
  @IsNotEmpty({ message: 'El pulso no debe estar vacío' })
  Pulso: number;

  @IsNumber({}, { message: 'La temperatura debe ser un número' })
  @IsNotEmpty({ message: 'La temperatura no debe estar vacía' })
  Temperatura: number;

  @IsNumber({}, { message: 'El id del paciente debe ser un número' })
  @IsNotEmpty({ message: 'El id del paciente no debe estar vacío' })
  PacienteId: number;
}
