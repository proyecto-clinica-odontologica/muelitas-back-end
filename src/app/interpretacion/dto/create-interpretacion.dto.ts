import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateInterpretacionDto {
  @IsString({ message: 'La radiografia panoramica debe ser un texto' })
  @IsNotEmpty({ message: 'La radiografia panoramica es obligatorio' })
  @Length(3, 255, { message: 'La radiografia panoramica debe tener entre 3 y 255 caracteres' })
  RadiografiaPanoramica: string;

  @IsString({ message: 'El hemograma completo debe ser un texto' })
  @IsNotEmpty({ message: 'El hemograma completo es obligatorio' })
  @Length(3, 255, { message: 'El hemograma completo debe tener entre 3 y 255 caracteres' })
  HemogramaCompleto: string;

  @IsString({ message: 'El tiempo de sangrado debe ser un texto' })
  @IsNotEmpty({ message: 'El tiempo de sangrado es obligatorio' })
  @Length(3, 255, { message: 'El tiempo de sangrado debe tener entre 3 y 255 caracteres' })
  TiempoSangrado: string;

  @IsString({ message: 'El tiempo de coagulacion debe ser un texto' })
  @IsNotEmpty({ message: 'El tiempo de coagulacion es obligatorio' })
  @Length(3, 255, { message: 'El tiempo de coagulacion debe tener entre 3 y 255 caracteres' })
  TiempoCoagulacion: string;

  @IsDate({ message: 'La fecha de registro debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de registro es obligatorio' })
  FechaRegistro: Date;

  @IsNotEmpty({ message: 'El id del paciente es obligatorio' })
  @IsInt({ message: 'El id del paciente debe ser un numero' })
  PacienteId: number;
}
