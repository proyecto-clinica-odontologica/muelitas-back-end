import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAnivelPiezaDto {
  @IsString({ message: 'La propiedad EnciaNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaNormal no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad EnciaNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaNormal: string;

  @IsString({ message: 'La propiedad EnciaFaltaoAusencia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaFaltaoAusencia no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad EnciaFaltaoAusencia debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaFaltaoAusencia: string;

  @IsString({ message: 'La propiedad EnciaInconsistencia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaInconsistencia no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad EnciaInconsistencia debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaInconsistencia: string;

  @IsString({ message: 'La propiedad ColorNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ColorNormal no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad ColorNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  ColorNormal: string;

  @IsString({ message: 'La propiedad ColorEritemosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ColorEritemosa no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad ColorEritemosa debe tener entre $constraint1 y $constraint2 caracteres' })
  ColorEritemosa: string;

  @IsString({ message: 'La propiedad ColorPalido debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ColorPalido no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad ColorPalido debe tener entre $constraint1 y $constraint2 caracteres' })
  ColorPalido: string;

  @IsString({ message: 'La propiedad TexturaNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad TexturaNormal no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad TexturaNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  TexturaNormal: string;

  @IsString({ message: 'La propiedad TexturaLisa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad TexturaLisa no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad TexturaLisa debe tener entre $constraint1 y $constraint2 caracteres' })
  TexturaLisa: string;

  @IsString({ message: 'La propiedad TexturaRugosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad TexturaRugosa no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad TexturaRugosa debe tener entre $constraint1 y $constraint2 caracteres' })
  TexturaRugosa: string;

  @IsString({ message: 'La propiedad ConsistenaciaNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ConsistenaciaNormal no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad ConsistenaciaNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  ConsistenaciaNormal: string;

  @IsString({ message: 'La propiedad ConsistenciaEdematosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ConsistenciaEdematosa no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad ConsistenciaEdematosa debe tener entre $constraint1 y $constraint2 caracteres' })
  ConsistenciaEdematosa: string;

  @IsString({ message: 'La propiedad ConsistenciaFibrosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ConsistenciaFibrosa no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad ConsistenciaFibrosa debe tener entre $constraint1 y $constraint2 caracteres' })
  ConsistenciaFibrosa: string;

  @IsString({ message: 'La propiedad EnciaPapilarNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaPapilarNormal no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad EnciaPapilarNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaPapilarNormal: string;

  @IsString({ message: 'La propiedad EnciaPapilarAplanada debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaPapilarAplanada no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad EnciaPapilarAplanada debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaPapilarAplanada: string;

  @IsString({ message: 'La propiedad EnciaPapilarCrateriforme debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaPapilarCrateriforme no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad EnciaPapilarCrateriforme debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaPapilarCrateriforme: string;

  @IsString({ message: 'La propiedad Encia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Encia no debe estar vacía' })
  @Length(3, 255, { message: 'La propiedad Encia debe tener entre $constraint1 y $constraint2 caracteres' })
  Encia: string;
}
