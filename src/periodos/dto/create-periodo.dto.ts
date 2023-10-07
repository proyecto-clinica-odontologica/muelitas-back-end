import { IsDateString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreatePeriodoDto {
  @IsNotEmpty()
  @Length(3, 30, { message: 'El nombre debe tener entre 3 y 30 caracteres' })
  @Matches(/^20\d{2}-(0[1-2])$/, {
    message: 'El formato para el nombre del periodo debe ser AAAA-01 o AAAA-02',
  })
  Nombre: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'Debe ser una fecha valida' })
  FechaInicio: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'Debe ser una fecha valida' })
  FechaFin: string;
}
