/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsDecimal } from 'class-validator';

export class UpdateHistoriaClinicaDto {
  
  @IsOptional()
  @IsString()
  motivoConsulta?: string;

  @IsOptional()
  @IsString()
  enfermedadActual: string;

  @IsOptional()
  @IsString()
  presionArterial: string;

  @IsOptional()
  @IsString()
  frecuenciaRespiratoria: string;

  @IsOptional()
  @IsString()
  pulso: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  temperatura: number;
}