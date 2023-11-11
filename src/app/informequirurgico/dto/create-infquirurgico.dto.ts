import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateInfQuirurgicoDto {
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  Nombre: string;

  @IsNotEmpty({ message: 'El detalle no debe estar vacío' })
  Detalle: string;

  //@IsNotEmpty()
  //@IsInt()
  //idCirugia: number;
}
