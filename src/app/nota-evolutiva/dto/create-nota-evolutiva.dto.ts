import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNotaEvolutivaDto {
  @IsDate({ message: 'La fecha debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La fecha es requerida' })
  Fecha: Date;

  @IsString({ message: 'El tratamiento debe ser un texto' })
  @IsNotEmpty({ message: 'El tratamiento es requerido' })
  @Length(3, 255, { message: 'El tratamiento debe tener entre 3 y 255 caracteres' })
  Tratamiento: string;

  @IsString({ message: 'La firma debe ser un texto' })
  @IsNotEmpty({ message: 'La firma es requerida' })
  @Length(3, 255, { message: 'La firma debe tener entre 3 y 255 caracteres' })
  Firma: string;

  @IsInt({ message: 'El id del paciente debe ser un numero entero' })
  @IsNotEmpty({ message: 'El id del paciente es requerido' })
  PacienteId: number;
}
