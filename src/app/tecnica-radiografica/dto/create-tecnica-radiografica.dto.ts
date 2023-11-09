import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateTecnicaRadiograficaDto {
  @IsNotEmpty({ message: 'La propiedad propiedad   NumeroPieza es obligatorio' })
  @IsInt({ message: 'La propiedad NumeroPieza debe ser un número entero' })
  @Min(1, { message: 'La propiedad NumeroPieza debe ser mayor o igual a $constraint1' })
  NumeroPieza: number;

  @IsString({ message: 'La propiedad Detalle debe ser un texto valido' })
  @IsNotEmpty({ message: 'La propiedad propiedad Detalle es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Detalle debe tener entre $constraint1 y $constraint2 caracteres' })
  Detalle: string;

  @IsString({ message: 'La propiedad Tipo debe ser un texto valido' })
  @IsNotEmpty({ message: 'La propiedad propiedad Tipo es obligatorio' })
  @Length(3, 255, { message: 'La propiedad Tipo debe tener entre $constraint1 y $constraint2 caracteres' })
  Tipo: string;

  @IsInt({ message: 'La cirugia debe ser un número entero' })
  @IsNotEmpty({ message: 'La cirugia es requerida' })
  OperatoriaId: number;
}
