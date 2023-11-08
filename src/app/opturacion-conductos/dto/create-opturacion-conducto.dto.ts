import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOpturacionConductoDto {
  @IsString({ message: 'La propiedad Conducto debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad Conducto es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Conducto debe tener entre $constraint1 y $constraint2 caracteres' })
  Conducto: string;

  @IsString({ message: 'La propiedad Tecnica debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad Tecnica es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Tecnica debe tener entre $constraint1 y $constraint2 caracteres' })
  Tecnica: string;

  @IsString({ message: 'La propiedad UltimaLongituddeTrabajo debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad UltimaLongituddeTrabajo es obligatoria' })
  @Length(3, 255, { message: 'La propiedad UltimaLongituddeTrabajo debe tener entre $constraint1 y $constraint2 caracteres' })
  UltimaLongituddeTrabajo: string;

  @IsString({ message: 'La propiedad ConoMaestro debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad ConoMaestro es obligatoria' })
  @Length(3, 255, { message: 'La propiedad ConoMaestro debe tener entre $constraint1 y $constraint2 caracteres' })
  ConoMaestro: string;

  @IsString({ message: 'La propiedad Referencia debe ser texto' })
  @IsNotEmpty({ message: 'La propiedad Referencia es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Referencia debe tener entre $constraint1 y $constraint2 caracteres' })
  Referencia: string;

  @IsDate({ message: 'La propiedad FechaRegistro debe ser una fecha valida' })
  @IsNotEmpty({ message: 'La propiedad FechaRegistro es obligatoria' })
  FechaRegistro: Date;

  @IsNotEmpty({ message: 'El id de endodoncia es obligatoria' })
  @IsInt({ message: 'La propiedad endodonciaId debe ser un numero entero' })
  EndodonciaId: number;
}
