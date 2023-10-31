import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDiagnosticoDefinitivoDto {
  @IsString({ message: 'El diagnostico debe ser un texto' })
  @IsNotEmpty({ message: 'El diagnostico es requerido' })
  @Length(3, 255, { message: 'El diagnostico debe tener entre $constraint1 y $constraint2 caracteres' })
  Diagnostico: string;

  @IsDate({ message: 'La fecha de registro debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de registro es requerida' })
  FechaRegistro: Date;

  @IsNotEmpty({ message: 'El id del paciente es requerido' })
  @IsInt({ message: 'El id del paciente debe ser un numero entero' })
  PacienteId: number;
}
