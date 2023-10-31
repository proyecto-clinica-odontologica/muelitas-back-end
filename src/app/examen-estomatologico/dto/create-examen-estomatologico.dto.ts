import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateExamenEstomatologicoDto {
  @IsString({ message: 'La propiedad EnciaNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaNormal es obligatoria' })
  @Length(3, 255, { message: 'La propiedad EnciaNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaNormal: string;

  @IsString({ message: 'La propiedad EnciaFaltaoAusencia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaFaltaoAusencia es obligatoria' })
  @Length(3, 255, { message: 'La propiedad EnciaFaltaoAusencia debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaFaltaoAusencia: string;

  @IsString({ message: 'La propiedad EnciaInconsistencia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaInconsistencia es obligatoria' })
  @Length(3, 255, { message: 'La propiedad EnciaInconsistencia debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaInconsistencia: string;

  @IsString({ message: 'La propiedad ColorNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ColorNormal es obligatoria' })
  @Length(3, 255, { message: 'La propiedad ColorNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  ColorNormal: string;

  @IsString({ message: 'La propiedad ColorEritemosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ColorEritemosa es obligatoria' })
  @Length(3, 255, { message: 'La propiedad ColorEritemosa debe tener entre $constraint1 y $constraint2 caracteres' })
  ColorEritemosa: string;

  @IsString({ message: 'La propiedad ColorPalido debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ColorPalido es obligatoria' })
  @Length(3, 255, { message: 'La propiedad ColorPalido debe tener entre $constraint1 y $constraint2 caracteres' })
  ColorPalido: string;

  @IsString({ message: 'La propiedad TexturaNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad TexturaNormal es obligatoria' })
  @Length(3, 255, { message: 'La propiedad TexturaNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  TexturaNormal: string;

  @IsString({ message: 'La propiedad TexturaLisa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad TexturaLisa es obligatoria' })
  @Length(3, 255, { message: 'La propiedad TexturaLisa debe tener entre $constraint1 y $constraint2 caracteres' })
  TexturaLisa: string;

  @IsString({ message: 'La propiedad TexturaRugosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad TexturaRugosa es obligatoria' })
  @Length(3, 255, { message: 'La propiedad TexturaRugosa debe tener entre $constraint1 y $constraint2 caracteres' })
  TexturaRugosa: string;

  @IsString({ message: 'La propiedad ConsistenaciaNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ConsistenaciaNormal es obligatoria' })
  @Length(3, 255, { message: 'La propiedad ConsistenaciaNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  ConsistenaciaNormal: string;

  @IsString({ message: 'La propiedad ConsistenciaEdematosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ConsistenciaEdematosa es obligatoria' })
  @Length(3, 255, { message: 'La propiedad ConsistenciaEdematosa debe tener entre $constraint1 y $constraint2 caracteres' })
  ConsistenciaEdematosa: string;

  @IsString({ message: 'La propiedad ConsistenciaFibrosa debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ConsistenciaFibrosa es obligatoria' })
  @Length(3, 255, { message: 'La propiedad ConsistenciaFibrosa debe tener entre $constraint1 y $constraint2 caracteres' })
  ConsistenciaFibrosa: string;

  @IsString({ message: 'La propiedad EnciaPapilarNormal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaPapilarNormal es obligatoria' })
  @Length(3, 255, { message: 'La propiedad EnciaPapilarNormal debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaPapilarNormal: string;

  @IsString({ message: 'La propiedad EnciaPapilarAplanada debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaPapilarAplanada es obligatoria' })
  @Length(3, 255, { message: 'La propiedad EnciaPapilarAplanada debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaPapilarAplanada: string;

  @IsString({ message: 'La propiedad EnciaPapilarCrateriforme debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad EnciaPapilarCrateriforme es obligatoria' })
  @Length(3, 255, { message: 'La propiedad EnciaPapilarCrateriforme debe tener entre $constraint1 y $constraint2 caracteres' })
  EnciaPapilarCrateriforme: string;

  @IsString({ message: 'La propiedad Encia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Encia es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Encia debe tener entre $constraint1 y $constraint2 caracteres' })
  Encia: string;

  @IsString({ message: 'La propiedad MaxilarSuperior debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad MaxilarSuperior es obligatoria' })
  @Length(3, 255, { message: 'La propiedad MaxilarSuperior debe tener entre $constraint1 y $constraint2 caracteres' })
  MaxilarSuperior: string;

  @IsString({ message: 'La propiedad MaxilarInferior debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad MaxilarInferior es obligatoria' })
  @Length(3, 255, { message: 'La propiedad MaxilarInferior debe tener entre $constraint1 y $constraint2 caracteres' })
  MaxilarInferior: string;

  @IsNumber({}, { message: 'La propiedad Numero debe ser de tipo number' })
  @IsNotEmpty({ message: 'La propiedad Numero es obligatoria' })
  @Min(1, { message: 'La propiedad Numero debe ser mayor o igual a $constraint1' })
  Numero: number;

  @IsString({ message: 'La propiedad Color debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Color es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Color debe tener entre $constraint1 y $constraint2 caracteres' })
  Color: string;

  @IsString({ message: 'La propiedad Forma debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Forma es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Forma debe tener entre $constraint1 y $constraint2 caracteres' })
  Forma: string;

  @IsString({ message: 'La propiedad Tamano debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Tamano es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Tamano debe tener entre $constraint1 y $constraint2 caracteres' })
  Tamano: string;

  @IsString({ message: 'La propiedad Diastemas debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Diastemas es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Diastemas debe tener entre $constraint1 y $constraint2 caracteres' })
  Diastemas: string;

  @IsString({ message: 'La propiedad ZonasEdentulasyRebordeAlveolar debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad ZonasEdentulasyRebordeAlveolar es obligatoria' })
  @Length(3, 255, {
    message: 'La propiedad ZonasEdentulasyRebordeAlveolar debe tener entre $constraint1 y $constraint2 caracteres',
  })
  ZonasEdentulasyRebordeAlveolar: string;

  @IsString({ message: 'La propiedad AlteracionDePosiciones debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad AlteracionDePosiciones es obligatoria' })
  @Length(3, 255, { message: 'La propiedad AlteracionDePosiciones debe tener entre $constraint1 y $constraint2 caracteres' })
  AlteracionDePosiciones: string;

  @IsString({ message: 'La propiedad FacetaDeDesgaste debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad FacetaDeDesgaste es obligatoria' })
  @Length(3, 255, { message: 'La propiedad FacetaDeDesgaste debe tener entre $constraint1 y $constraint2 caracteres' })
  FacetaDeDesgaste: string;

  @IsString({ message: 'La propiedad LineaMedia debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad LineaMedia es obligatoria' })
  @Length(3, 255, { message: 'La propiedad LineaMedia debe tener entre $constraint1 y $constraint2 caracteres' })
  LineaMedia: string;

  @IsString({ message: 'La propiedad Otro debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Otro es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Otro debe tener entre $constraint1 y $constraint2 caracteres' })
  Otro: string;

  @IsString({ message: 'La propiedad LabiosyComisuraLabial debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad LabiosyComisuraLabial es obligatoria' })
  @Length(3, 255, { message: 'La propiedad LabiosyComisuraLabial debe tener entre $constraint1 y $constraint2 caracteres' })
  LabiosyComisuraLabial: string;

  @IsString({ message: 'La propiedad PaladarDuroyBlando debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad PaladarDuroyBlando es obligatoria' })
  @Length(3, 255, { message: 'La propiedad PaladarDuroyBlando debe tener entre $constraint1 y $constraint2 caracteres' })
  PaladarDuroyBlando: string;

  @IsString({ message: 'La propiedad Carrillos debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Carrillos es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Carrillos debe tener entre $constraint1 y $constraint2 caracteres' })
  Carrillos: string;

  @IsString({ message: 'La propiedad PisodeBoca debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad PisodeBoca es obligatoria' })
  @Length(3, 255, { message: 'La propiedad PisodeBoca debe tener entre $constraint1 y $constraint2 caracteres' })
  PisodeBoca: string;

  @IsString({ message: 'La propiedad Lengua debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Lengua es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Lengua debe tener entre $constraint1 y $constraint2 caracteres' })
  Lengua: string;

  @IsString({ message: 'La propiedad Orofaringe debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Orofaringe es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Orofaringe debe tener entre $constraint1 y $constraint2 caracteres' })
  Orofaringe: string;

  @IsString({ message: 'La propiedad Frenillos debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Frenillos es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Frenillos debe tener entre $constraint1 y $constraint2 caracteres' })
  Frenillos: string;

  @IsString({ message: 'La propiedad Saliva debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Saliva es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Saliva debe tener entre $constraint1 y $constraint2 caracteres' })
  Saliva: string;

  @IsString({ message: 'La propiedad Temporal debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Temporal es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Temporal debe tener entre $constraint1 y $constraint2 caracteres' })
  Temporal: string;

  @IsString({ message: 'La propiedad Masetero debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Masetero es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Masetero debe tener entre $constraint1 y $constraint2 caracteres' })
  Masetero: string;

  @IsString({ message: 'La propiedad PteriogoideoInterno debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad PteriogoideoInterno es obligatoria' })
  @Length(3, 255, { message: 'La propiedad PteriogoideoInterno debe tener entre $constraint1 y $constraint2 caracteres' })
  PteriogoideoInterno: string;

  @IsString({ message: 'La propiedad PteriogoideoExterno debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad PteriogoideoExterno es obligatoria' })
  @Length(3, 255, { message: 'La propiedad PteriogoideoExterno debe tener entre $constraint1 y $constraint2 caracteres' })
  PteriogoideoExterno: string;

  @IsString({ message: 'La propiedad Digastrico debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Digastrico es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Digastrico debe tener entre $constraint1 y $constraint2 caracteres' })
  Digastrico: string;

  @IsString({ message: 'La propiedad Esternocleidomastoideo debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad Esternocleidomastoideo es obligatoria' })
  @Length(3, 255, { message: 'La propiedad Esternocleidomastoideo debe tener entre $constraint1 y $constraint2 caracteres' })
  Esternocleidomastoideo: string;

  @IsString({ message: 'La propiedad RelacionMolarDerecha debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad RelacionMolarDerecha es obligatoria' })
  @Length(3, 255, { message: 'La propiedad RelacionMolarDerecha debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionMolarDerecha: string;

  @IsString({ message: 'La propiedad RelacionMolarIzquierda debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad RelacionMolarIzquierda es obligatoria' })
  @Length(3, 255, { message: 'La propiedad RelacionMolarIzquierda debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionMolarIzquierda: string;

  @IsString({ message: 'La propiedad RelacionCaninaDerecha debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad RelacionCaninaDerecha es obligatoria' })
  @Length(3, 255, { message: 'La propiedad RelacionCaninaDerecha debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionCaninaDerecha: string;

  @IsString({ message: 'La propiedad RelacionCaninaIzquierda debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad RelacionCaninaIzquierda es obligatoria' })
  @Length(3, 255, { message: 'La propiedad RelacionCaninaIzquierda debe tener entre $constraint1 y $constraint2 caracteres' })
  RelacionCaninaIzquierda: string;

  @IsString({ message: 'La propiedad GradoDeApertura debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad GradoDeApertura es obligatoria' })
  @Length(3, 255, { message: 'La propiedad GradoDeApertura debe tener entre $constraint1 y $constraint2 caracteres' })
  GradoDeApertura: string;

  @IsString({ message: 'La propiedad OverBite debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad OverBite es obligatoria' })
  @Length(3, 255, { message: 'La propiedad OverBite debe tener entre $constraint1 y $constraint2 caracteres' })
  OverBite: string;

  @IsString({ message: 'La propiedad OverJet debe ser de tipo string' })
  @IsNotEmpty({ message: 'La propiedad OverJet es obligatoria' })
  @Length(3, 255, { message: 'La propiedad OverJet debe tener entre $constraint1 y $constraint2 caracteres' })
  OverJet: string;

  @IsInt({ message: 'La propiedad PacienteId debe ser de tipo number' })
  @IsNotEmpty({ message: 'La propiedad PacienteId es obligatoria' })
  PacienteId: number;
}
