import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateHistoriaClinicaDto {
  @IsNotEmpty()
  @IsString()
  MotivoConsulta: string;

  @IsNotEmpty()
  @IsString()
  EnfermedadActual: string;

  @IsNumberString({}, { message: 'La presión arterial debe ser un número.' })
  PresionArterial: string;

  @IsNumberString({ no_symbols: true }, { message: 'La frecuencia respiratoria debe ser un número.' })
  FrecuenciaRespiratoria: string;

  @IsNumberString({ no_symbols: true }, { message: 'El pulso debe ser un número.' })
  Pulso: string;

  @IsNumber({}, { message: 'La temperatura debe ser un número.' })
  Temperatura: number;
}
