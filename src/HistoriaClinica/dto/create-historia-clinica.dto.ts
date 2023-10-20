/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';

export class CreateHistoriaClinicaDto {
  @IsNotEmpty()
  motivoConsulta: string;

  @IsNotEmpty()
  enfermedadActual: string;

  @IsNumberString({}, { message: 'La presión arterial debe ser un número.' })
  presionArterial: string;

  @IsNumberString({ no_symbols: true }, { message: 'La frecuencia respiratoria debe ser un número.' })
  frecuenciaRespiratoria: string;

  @IsNumberString({ no_symbols: true }, { message: 'El pulso debe ser un número.' })
  pulso: string;

  @IsNumber({}, { message: 'La temperatura debe ser un número.' })
  temperatura: number;
}