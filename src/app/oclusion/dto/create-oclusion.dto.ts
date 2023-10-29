import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOclusionDto {
  @IsNotEmpty({ message: 'La propiedad RelacionMolarDerecha no puede estar vacía' })
  @IsString({ message: 'La propiedad RelacionMolarDerecha debe ser de tipo string' })
  @Length(3, 255, { message: 'La propiedad RelacionMolarDerecha debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionMolarDerecha: string;

  @IsNotEmpty({ message: 'La propiedad RelacionMolarIzquierda no puede estar vacía' })
  @IsString({ message: 'La propiedad RelacionMolarIzquierda debe ser de tipo string' })
  @Length(3, 255, { message: 'La propiedad RelacionMolarIzquierda debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionMolarIzquierda: string;

  @IsNotEmpty({ message: 'La propiedad RelacionCaninaDerecha no puede estar vacía' })
  @IsString({ message: 'La propiedad RelacionCaninaDerecha debe ser de tipo string' })
  @Length(3, 255, { message: 'La propiedad RelacionCaninaDerecha debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionCaninaDerecha: string;

  @IsNotEmpty({ message: 'La propiedad RelacionCaninaIzquierda no puede estar vacía' })
  @IsString({ message: 'La propiedad RelacionCaninaIzquierda debe ser de tipo string' })
  @Length(3, 255, { message: 'La propiedad RelacionCaninaIzquierda debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionCaninaIzquierda: string;

  @IsNotEmpty({ message: 'La propiedad GradoDeApertura no puede estar vacía' })
  @IsString({ message: 'La propiedad GradoDeApertura debe ser de tipo string' })
  @Length(3, 255, { message: 'La propiedad GradoDeApertura debe tener entre $constraint1 y $constraint2 caracteres' })
  GradoDeApertura: string;

  @IsNotEmpty({ message: 'La propiedad OverBite no puede estar vacía' })
  @IsString({ message: 'La propiedad OverBite debe ser de tipo string' })
  @Length(3, 255, { message: 'La propiedad OverBite debe tener entre $constraint1 y $constraint2 caracteres' })
  OverBite: string;

  @IsNotEmpty({ message: 'La propiedad OverJet no puede estar vacía' })
  @IsString({ message: 'La propiedad OverJet debe ser de tipo string' })
  @Length(3, 255, { message: 'La propiedad OverJet debe tener entre $constraint1 y $constraint2 caracteres' })
  OverJet: string;

  @IsInt()
  @IsNotEmpty()
  ExamenEstomatologicoId: number;
}
