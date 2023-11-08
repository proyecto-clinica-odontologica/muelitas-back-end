import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateConductometriaDto {
  @IsString({ message: 'La propiedad Conducto debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Conducto es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Conducto debe tener entre $constraint1 y $constraint2 caracteres' })
  Conducto: string;

  @IsString({ message: 'La propiedad LongRx debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad LongRx es obligatoria' })
  @Length(3, 255, { message: 'La propiedad LongRx debe tener entre $constraint1 constraint2 caracteres' })
  LongRx: string;

  @IsString({ message: 'La propiedad LongTrabajo debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad LongTrabajo es obligatoria' })
  @Length(3, 255, { message: 'La propiedad LongTrabajo debe tener entre $constraint1 constraint2 caracteres' })
  LongTrabajo: string;

  @IsString({ message: 'La propiedad Inicial debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Inicial es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Inicial debe tener entre $constraint1 constraint2 caracteres' })
  Inicial: string;

  @IsString({ message: 'La propiedad Referencia debe ser de tipo texto' })
  @IsNotEmpty({ message: 'La propiedad Referencia es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Referencia debe tener entre $constraint1 constraint2 caracteres' })
  Referencia: string;

  @IsDate({ message: 'La propiedad FechaRegistro debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La propiedad FechaRegistro es obligatoria' })
  FechaRegistro: Date;

  @IsNotEmpty({ message: 'La propiedad Endodoncia Id es obligatoria' })
  @IsInt({ message: 'La propiedad Endodoncia Id debe ser un numero entero' })
  EndodonciaId: number;
}
