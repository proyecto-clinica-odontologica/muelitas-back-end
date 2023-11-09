import { IsDate, IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreatePlanTrabajoDto {
  @IsInt({ message: 'La propiedad Cantidad debe ser un número entero' })
  @IsNotEmpty({ message: 'La propiedad Cantidad es obligatoria' })
  @Min(1, { message: 'La propiedad Cantidad debe ser mayor o igual a $constraint1' })
  Cantidad: number;

  @IsNotEmpty({ message: 'La propiedad FechaRegistro es obligatoria' })
  @IsDate({ message: 'La propiedad FechaRegistro debe ser una fecha valida' })
  FechaRegistro: Date;

  @IsString({ message: 'La propiedad Tratamiento debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad Tratamiento es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Tratamiento debe tener entr $constraint1 y $constraint2 caracteres' })
  Tratamiento: string;

  @IsString({ message: 'La propiedad PiezaNumero debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad PiezaNumero es obligatoria' })
  @Length(3, 255, { message: 'La propiedad PiezaNumero debe tener entr $constraint1 y $constraint2 caracteres' })
  PiezaNumero: string;

  @IsString({ message: 'La propiedad TipoMaterialRestaurador debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad TipoMaterialRestaurador es obligatoria' })
  @Length(3, 255, { message: 'La propiedad TipoMaterialRestaurador debe tener entr $constraint1 y $constraint2 caracteres' })
  TipoMaterialRestaurador: string;

  @IsInt({ message: 'La cirugia debe ser un número entero' })
  @IsNotEmpty({ message: 'La cirugia es requerida' })
  OperatoriaId: number;
}
