import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTratamientoDto {
  @IsString({ message: 'El nombre del tratamiento debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del tratamiento no debe estar vacío' })
  @Length(3, 255, {
    message:
      'El nombre del tratamiento debe tener entre $constraint1 y $constraint2 caracteres',
  })
  Nombre: string;
}
