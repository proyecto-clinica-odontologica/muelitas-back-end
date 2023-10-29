import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDolorDto {
  @IsString({ message: 'La propiedad Temporal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Temporal no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Temporal debe tener entre 3 y 255 caracteres' })
  Temporal: string;

  @IsString({ message: 'La propiedad Masetero debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Masetero no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Masetero debe tener entre 3 y 255 caracteres' })
  Masetero: string;

  @IsString({ message: 'La propiedad PteriogoideoInterno debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad PteriogoideoInterno no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad PteriogoideoInterno debe tener entre 3 y 255 caracteres' })
  PteriogoideoInterno: string;

  @IsString({ message: 'La propiedad PteriogoideoExterno debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad PteriogoideoExterno no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad PteriogoideoExterno debe tener entre 3 y 255 caracteres' })
  PteriogoideoExterno: string;

  @IsString({ message: 'La propiedad Digastrico debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Digastrico no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Digastrico debe tener entre 3 y 255 caracteres' })
  Digastrico: string;

  @IsString({ message: 'La propiedad Esternocleidomastoideo debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Esternocleidomastoideo no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Esternocleidomastoideo debe tener entre 3 y 255 caracteres' })
  Esternocleidomastoideo: string;
}
