import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateManifestacionDolorDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Length(3, 255, { message: 'El nombre debe tener entre 3 y 255 caracteres' })
  Nombre: string;
}
