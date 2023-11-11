import { IsInt, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateDiagnosticoDto {

  @IsNotEmpty({ message: 'El tipo del tratamiento no debe estar vacío' })
  Tipo: string;

  @IsNotEmpty({ message: 'La version del tratamiento no debe estar vacío' })
  Version: string;

  @IsNotEmpty({ message: 'El código del tratamiento no debe estar vacío' })
  @IsNumber()
  Codigo: number;

  @IsNotEmpty({ message: 'El resumen del tratamiento no debe estar vacío' })
  Resumen: string;

  @IsNotEmpty({ message: 'El detalle del tratamiento no debe estar vacío' })
  Detalle: string;
}
