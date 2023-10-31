import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEpicrisisDto {
  @IsString({ message: 'El contenido debe ser un texto' })
  @IsNotEmpty({ message: 'El contenido es requerido' })
  @Length(3, 255, { message: 'El contenido debe tener entre 3 y 255 caracteres' })
  Contenido: string;

  @IsDate({ message: 'La fecha de registro debe ser una fecha' })
  @IsNotEmpty({ message: 'La fecha de registro es requerida' })
  FechaRegistro: Date;

  @IsInt({ message: 'El id del paciente debe ser un número entero' })
  @IsNotEmpty({ message: 'El id del paciente es requerido' })
  PacienteId: number;
}
