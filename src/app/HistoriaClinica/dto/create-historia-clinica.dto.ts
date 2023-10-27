import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateHistoriaClinicaDto {
  @IsNotEmpty()
  @IsString()
  MotivoConsulta: string;

  @IsNotEmpty()
  @IsString()
  EnfermedadActual: string;

  @IsNumber({}, { message: 'La presión arterial debe ser un número.' })
  PresionArterial: number;

  @IsNumber({}, { message: 'La presión arterial debe ser un número.' })
  FrecuenciaRespiratoria: number;

  @IsNumber({}, { message: 'El pulso debe ser un número.' })
  Pulso: number;

  @IsNumber({}, { message: 'La temperatura debe ser un número.' })
  Temperatura: number;

  @IsNotEmpty()
  @IsNumber()
  IdPaciente: number;
}
