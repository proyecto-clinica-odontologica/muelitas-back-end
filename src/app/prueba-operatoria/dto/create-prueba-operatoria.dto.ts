import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePruebaOperatoriaDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Length(3, 255, { message: 'El nombre debe tener entre $constraint1 y $constraint2 caracteres' })
  Nombre: string;

  @IsInt({ message: 'La cirugia debe ser un número entero' })
  @IsNotEmpty({ message: 'La cirugia es requerida' })
  OperatoriaId: number;
}
