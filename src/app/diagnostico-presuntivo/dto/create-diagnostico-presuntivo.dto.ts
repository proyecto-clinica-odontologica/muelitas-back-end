import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiagnosticoPresuntivoDto {
  @IsString({ message: 'El diagnostico debe ser un texto' })
  @IsNotEmpty({ message: 'El diagnostico es requerido' })
  Diagnostico: string;

  @IsDate({ message: 'La fecha de registro debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de registro es requerida' })
  FechaRegistro: Date; 
}
