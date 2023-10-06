import { IsString, Length, Matches } from 'class-validator';

export class CreateTipoSedeDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El nombre debe contener solo letras' })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 30 caracteres' })
  Nombre: string;
}
