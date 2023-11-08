import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePreparacionQuimicaDto {
  @IsString({ message: 'La propiedad Conducto debe tener letras' })
  @IsNotEmpty({ message: 'La propiedad Conducto es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Conducto debe tener entre $constraint1 y $constraint2 caracteres' })
  Conducto: string;

  @IsString({ message: 'La propiedad Tecnica debe tener letras' })
  @IsNotEmpty({ message: 'La propiedad Tecnica es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Tecnica debe tener entre $constraint1 y $constraint2 caracteres' })
  Tecnica: string;

  @IsString({ message: 'La propiedad IFinal debe tener letras' })
  @IsNotEmpty({ message: 'La propiedad IFinal es obligatoria' })
  @Length(3, 255, { message: 'La propiedad IFinal debe tener entre $constraint1 y $constraint2 caracteres' })
  IFinal: string;

  @IsString({ message: 'La propiedad UltmaLongituddeTrabajo debe tener letras' })
  @IsNotEmpty({ message: 'La propiedad UltmaLongituddeTrabajo es obligatoria' })
  @Length(3, 255, { message: 'La propiedad UltmaLongituddeTrabajo debe tener entre $constraint1 y $constraint2 caracteres' })
  UltmaLongituddeTrabajo: string;

  @IsString({ message: 'La propiedad Referencia debe tener letras' })
  @IsNotEmpty({ message: 'La propiedad Referencia es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Referencia debe tener entre $constraint1 y $constraint2 caracteres' })
  Referencia: string;

  @IsDate({ message: 'La propiedad FechaRegistro debe tener una fecha valida' })
  @IsNotEmpty({ message: 'La propiedad FechaRegistro es obligatoria' })
  FechaRegistro: Date;

  @IsNotEmpty({ message: 'La propiedad EndodonciaId es obligatoria' })
  @IsInt({ message: 'La propiedad EndodonciaId debe ser un entero' })
  EndodonciaId: number;
}
