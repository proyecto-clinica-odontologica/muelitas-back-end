import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnamnesisDto {
  @IsString({ message: 'El contenido debe ser un string' })
  @IsNotEmpty({ message: 'El contenido no debe estar vacío' })
  Contenido: string;

  @IsDate({ message: 'La fecha de registro debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de registro no debe estar vacía' })
  FechaRegistro: Date;
}
