import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTejidosDuroDto {
  @IsString({ message: 'La propiedad MaxilarSuperior debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad MaxilarSuperior no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad MaxilarSuperior debe tener entre $constraint1 y $constraint2 caracteres' })
  MaxilarSuperior: string;

  @IsString({ message: 'La propiedad MaxilarInferior debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad MaxilarInferior no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad MaxilarInferior debe tener entre $constraint1 y $constraint2 caracteres' })
  MaxilarInferior: string;

  @IsString({ message: 'La propiedad Numero debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Numero no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Numero debe tener entre $constraint1 y $constraint2 caracteres' })
  Numero: number;

  @IsString({ message: 'La propiedad Color debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Color no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Color debe tener entre $constraint1 y $constraint2 caracteres' })
  Color: string;

  @IsString({ message: 'La propiedad Forma debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Forma no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Forma debe tener entre $constraint1 y $constraint2 caracteres' })
  Forma: string;

  @IsString({ message: 'La propiedad Tamano debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Tamano no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Tamano debe tener entre $constraint1 y $constraint2 caracteres' })
  Tamano: string;

  @IsString({ message: 'La propiedad Diastemas debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Diastemas no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Diastemas debe tener entre $constraint1 y $constraint2 caracteres' })
  Diastemas: string;

  @IsString({ message: 'La propiedad ZonasEdentulasyRebordeAlveolar debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ZonasEdentulasyRebordeAlveolar no debe estar vacía' })
  @Length(3, 255, {
    message: 'La propiedad ZonasEdentulasyRebordeAlveolar debe tener entre $constraint1 y $constraint2 caracteres',
  })
  ZonasEdentulasyRebordeAlveolar: string;

  @IsString({ message: 'La propiedad AlteracionDePosiciones debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad AlteracionDePosiciones no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad AlteracionDePosiciones debe tener entre $constraint1 y $constraint2 caracteres' })
  AlteracionDePosiciones: string;

  @IsString({ message: 'La propiedad FacetaDeDesgaste debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad FacetaDeDesgaste no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad FacetaDeDesgaste debe tener entre $constraint1 y $constraint2 caracteres' })
  FacetaDeDesgaste: string;

  @IsString({ message: 'La propiedad LineaMedia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad LineaMedia no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad LineaMedia debe tener entre $constraint1 y $constraint2 caracteres' })
  LineaMedia: string;

  @IsString({ message: 'La propiedad Otro debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Otro no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Otro debe tener entre $constraint1 y $constraint2 caracteres' })
  Otro: string;
}
