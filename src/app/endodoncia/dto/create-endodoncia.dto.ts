import { IsDate, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEndodonciaDto {
  @IsNotEmpty({ message: 'La propiedad Fecha no debe estar vacia' })
  @IsDate({ message: 'La propiedad Fecha debe ser una fecha valida' })
  Fecha: Date;

  @IsNotEmpty({ message: 'La propiedad MotivoConsulta no debe estar vacia' })
  @IsString({ message: 'La propiedad MotivoConsulta debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad MotivoConsulta debe tener entre $constraint1 y $constraint2 caracteres' })
  MotivoConsulta: string;

  @IsNotEmpty({ message: 'La propiedad PiezaDental no debe estar vacia' })
  @IsString({ message: 'La propiedad PiezaDental debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad PiezaDental debe tener entre $constraint1 y $constraint2 caracteres' })
  PiezaDental: string;

  @IsNotEmpty({ message: 'La propiedad ECPercusion no debe estar vacia' })
  @IsString({ message: 'La propiedad ECPercusion debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ECPercusion debe tener entre $constraint1 y $constraint2 caracteres' })
  ECPercusion: string;

  @IsNotEmpty({ message: 'La propiedad ECCavidad no debe estar vacia' })
  @IsString({ message: 'La propiedad ECCavidad debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ECCavidad debe tener entre $constraint1 y $constraint2 caracteres' })
  ECCavidad: string;

  @IsNotEmpty({ message: 'La propiedad ECCambioColor no debe estar vacia' })
  @IsString({ message: 'La propiedad ECCambioColor debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ECCambioColor debe tener entre $constraint1 y $constraint2 caracteres' })
  ECCambioColor: string;

  @IsNotEmpty({ message: 'La propiedad ECTejidosBlandos no debe estar vacia' })
  @IsString({ message: 'La propiedad ECTejidosBlandos debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ECTejidosBlandos debe tener entre $constraint1 y $constraint2 caracteres' })
  ECTejidosBlandos: string;

  @IsNotEmpty({ message: 'La propiedad ECTermoreaccion no debe estar vacia' })
  @IsString({ message: 'La propiedad ECTermoreaccion debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ECTermoreaccion debe tener entre $constraint1 y $constraint2 caracteres' })
  ECTermoreaccion: string;

  @IsNotEmpty({ message: 'La propiedad ECElectroReaccion no debe estar vacia' })
  @IsString({ message: 'La propiedad ECElectroReaccion debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ECElectroReaccion debe tener entre $constraint1 y $constraint2 caracteres' })
  ECElectroReaccion: string;

  @IsNotEmpty({ message: 'La propiedad ERCavidad no debe estar vacia' })
  @IsString({ message: 'La propiedad ERCavidad debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ERCavidad debe tener entre $constraint1 y $constraint2 caracteres' })
  ERCavidad: string;

  @IsNotEmpty({ message: 'La propiedad ERTratamientoPrevio no debe estar vacia' })
  @IsString({ message: 'La propiedad ERTratamientoPrevio debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ERTratamientoPrevio debe tener entre $constraint1 y $constraint2 caracteres' })
  ERTratamientoPrevio: string;

  @IsNotEmpty({ message: 'La propiedad ERPeriodyro no debe estar vacia' })
  @IsString({ message: 'La propiedad ERPeriodyro debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ERPeriodyro debe tener entre $constraint1 y $constraint2 caracteres' })
  ERPeriodyro: string;

  @IsNotEmpty({ message: 'La propiedad ERLesionesPeriauriculares no debe estar vacia' })
  @IsString({ message: 'La propiedad ERLesionesPeriauriculares debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ERLesionesPeriauriculares debe tener entre $constraint1 y $constraint2 caracteres' })
  ERLesionesPeriauriculares: string;

  @IsNotEmpty({ message: 'La propiedad ERNumerodeConductos no debe estar vacia' })
  @IsString({ message: 'La propiedad ERNumerodeConductos debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ERNumerodeConductos debe tener entre $constraint1 y $constraint2 caracteres' })
  ERNumerodeConductos: string;

  @IsNotEmpty({ message: 'La propiedad ERPresipitacionesCalcitas no debe estar vacia' })
  @IsString({ message: 'La propiedad ERPresipitacionesCalcitas debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad ERPresipitacionesCalcitas debe tener entre $constraint1 y $constraint2 caracteres' })
  ERPresipitacionesCalcitas: string;

  @IsNotEmpty({ message: 'La propiedad STAAnestecia no debe estar vacia' })
  @IsString({ message: 'La propiedad STAAnestecia debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad STAAnestecia debe tener entre $constraint1 y $constraint2 caracteres' })
  STAAnestecia: string;

  @IsNotEmpty({ message: 'La propiedad STAAislamientoAbsoluto no debe estar vacia' })
  @IsString({ message: 'La propiedad STAAislamientoAbsoluto debe ser un texto' })
  @Length(3, 255, { message: 'La propiedad STAAislamientoAbsoluto debe tener entre $constraint1 y $constraint2 caracteres' })
  STAAislamientoAbsoluto: string;

  @IsNotEmpty({ message: 'La propiedad FechaRegistro no debe estar vacia' })
  @IsDate({ message: 'La propiedad FechaRegistro debe ser una fecha valida' })
  FechaRegistro: Date;

  @IsInt({ message: 'El id del paciente debe ser un numero entero' })
  @IsNotEmpty({ message: 'El id del paciente es obligatorio' })
  PacienteId: number;
}
