import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateInterpRadDto {
  @IsNotEmpty({ message: 'El tipo del tratamiento no debe estar vacío' })
  Nombre: string;

  @IsNotEmpty({ message: 'La version del tratamiento no debe estar vacío' })
  Detalle: string;

  //@IsNotEmpty()
  //@IsInt()
  //idCirugia: number;
}
