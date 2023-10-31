import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class ExamenEstomatologico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  EnciaNormal: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaFaltaoAusencia: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaInconsistencia: string;

  @Column({ type: 'varchar', length: 255 })
  ColorNormal: string;

  @Column({ type: 'varchar', length: 255 })
  ColorEritemosa: string;

  @Column({ type: 'varchar', length: 255 })
  ColorPalido: string;

  @Column({ type: 'varchar', length: 255 })
  TexturaNormal: string;

  @Column({ type: 'varchar', length: 255 })
  TexturaLisa: string;

  @Column({ type: 'varchar', length: 255 })
  TexturaRugosa: string;

  @Column({ type: 'varchar', length: 255 })
  ConsistenaciaNormal: string;

  @Column({ type: 'varchar', length: 255 })
  ConsistenciaEdematosa: string;

  @Column({ type: 'varchar', length: 255 })
  ConsistenciaFibrosa: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaPapilarNormal: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaPapilarAplanada: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaPapilarCrateriforme: string;

  @Column({ type: 'varchar', length: 255 })
  Encia: string;

  @Column({ type: 'varchar', length: 255 })
  MaxilarSuperior: string;

  @Column({ type: 'varchar', length: 255 })
  MaxilarInferior: string;

  @Column({ type: 'varchar', length: 255 })
  Numero: number;

  @Column({ type: 'varchar', length: 255 })
  Color: string;

  @Column({ type: 'varchar', length: 255 })
  Forma: string;

  @Column({ type: 'varchar', length: 255 })
  Tamano: string;

  @Column({ type: 'varchar', length: 255 })
  Diastemas: string;

  @Column({ type: 'varchar', length: 255 })
  ZonasEdentulasyRebordeAlveolar: string;

  @Column({ type: 'varchar', length: 255 })
  AlteracionDePosiciones: string;

  @Column({ type: 'varchar', length: 255 })
  FacetaDeDesgaste: string;

  @Column({ type: 'varchar', length: 255 })
  LineaMedia: string;

  @Column({ type: 'varchar', length: 255 })
  Otro: string;

  @Column({ type: 'varchar', length: 255 })
  LabiosyComisuraLabial: string;

  @Column({ type: 'varchar', length: 255 })
  PaladarDuroyBlando: string;

  @Column({ type: 'varchar', length: 255 })
  Carrillos: string;

  @Column({ type: 'varchar', length: 255 })
  PisodeBoca: string;

  @Column({ type: 'varchar', length: 255 })
  Lengua: string;

  @Column({ type: 'varchar', length: 255 })
  Orofaringe: string;

  @Column({ type: 'varchar', length: 255 })
  Frenillos: string;

  @Column({ type: 'varchar', length: 255 })
  Saliva: string;

  @Column({ type: 'varchar', length: 255 })
  Temporal: string;

  @Column({ type: 'varchar', length: 255 })
  Masetero: string;

  @Column({ type: 'varchar', length: 255 })
  PteriogoideoInterno: string;

  @Column({ type: 'varchar', length: 255 })
  PteriogoideoExterno: string;

  @Column({ type: 'varchar', length: 255 })
  Digastrico: string;

  @Column({ type: 'varchar', length: 255 })
  Esternocleidomastoideo: string;

  @Column({ type: 'varchar', length: 255 })
  RelacionMolarDerecha: string;

  @Column({ type: 'varchar', length: 255 })
  RelacionMolarIzquierda: string;

  @Column({ type: 'varchar', length: 255 })
  RelacionCaninaDerecha: string;

  @Column({ type: 'varchar', length: 255 })
  RelacionCaninaIzquierda: string;

  @Column({ type: 'varchar', length: 255 })
  GradoDeApertura: string;

  @Column({ type: 'varchar', length: 255 })
  OverBite: string;

  @Column({ type: 'varchar', length: 255 })
  OverJet: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.EnciaNormal = this.EnciaNormal?.trim().toLowerCase();
    this.EnciaFaltaoAusencia = this.EnciaFaltaoAusencia?.trim().toLowerCase();
    this.EnciaInconsistencia = this.EnciaInconsistencia?.trim().toLowerCase();
    this.ColorNormal = this.ColorNormal?.trim().toLowerCase();
    this.ColorEritemosa = this.ColorEritemosa?.trim().toLowerCase();
    this.ColorPalido = this.ColorPalido?.trim().toLowerCase();
    this.TexturaNormal = this.TexturaNormal?.trim().toLowerCase();
    this.TexturaLisa = this.TexturaLisa?.trim().toLowerCase();
    this.TexturaRugosa = this.TexturaRugosa?.trim().toLowerCase();
    this.ConsistenaciaNormal = this.ConsistenaciaNormal?.trim().toLowerCase();
    this.ConsistenciaEdematosa = this.ConsistenciaEdematosa?.trim().toLowerCase();
    this.ConsistenciaFibrosa = this.ConsistenciaFibrosa?.trim().toLowerCase();
    this.EnciaPapilarNormal = this.EnciaPapilarNormal?.trim().toLowerCase();
    this.EnciaPapilarAplanada = this.EnciaPapilarAplanada?.trim().toLowerCase();
    this.EnciaPapilarCrateriforme = this.EnciaPapilarCrateriforme?.trim().toLowerCase();
    this.Encia = this.Encia?.trim().toLowerCase();

    this.MaxilarSuperior = this.MaxilarSuperior?.trim().toLowerCase();
    this.MaxilarInferior = this.MaxilarInferior?.trim().toLowerCase();
    this.Color = this.Color?.trim().toLowerCase();
    this.Forma = this.Forma?.trim().toLowerCase();
    this.Tamano = this.Tamano?.trim().toLowerCase();
    this.Diastemas = this.Diastemas?.trim().toLowerCase();
    this.ZonasEdentulasyRebordeAlveolar = this.ZonasEdentulasyRebordeAlveolar?.trim().toLowerCase();
    this.AlteracionDePosiciones = this.AlteracionDePosiciones?.trim().toLowerCase();
    this.FacetaDeDesgaste = this.FacetaDeDesgaste?.trim().toLowerCase();
    this.LineaMedia = this.LineaMedia?.trim().toLowerCase();
    this.Otro = this.Otro?.trim().toLowerCase();

    this.LabiosyComisuraLabial = this.LabiosyComisuraLabial?.trim().toLowerCase();
    this.PaladarDuroyBlando = this.PaladarDuroyBlando?.trim().toLowerCase();
    this.Carrillos = this.Carrillos?.trim().toLowerCase();
    this.PisodeBoca = this.PisodeBoca?.trim().toLowerCase();
    this.Lengua = this.Lengua?.trim().toLowerCase();
    this.Orofaringe = this.Orofaringe?.trim().toLowerCase();
    this.Frenillos = this.Frenillos?.trim().toLowerCase();
    this.Saliva = this.Saliva?.trim().toLowerCase();

    this.Temporal = this.Temporal?.trim().toLowerCase();
    this.Masetero = this.Masetero?.trim().toLowerCase();
    this.PteriogoideoInterno = this.PteriogoideoInterno?.trim().toLowerCase();
    this.PteriogoideoExterno = this.PteriogoideoExterno?.trim().toLowerCase();
    this.Digastrico = this.Digastrico?.trim().toLowerCase();
    this.Esternocleidomastoideo = this.Esternocleidomastoideo?.trim().toLowerCase();

    this.RelacionMolarDerecha = this.RelacionMolarDerecha.trim().toLowerCase();
    this.RelacionMolarIzquierda = this.RelacionMolarIzquierda.trim().toLowerCase();
    this.RelacionCaninaDerecha = this.RelacionCaninaDerecha.trim().toLowerCase();
    this.RelacionCaninaIzquierda = this.RelacionCaninaIzquierda.trim().toLowerCase();
    this.GradoDeApertura = this.GradoDeApertura.trim().toLowerCase();
    this.OverBite = this.OverBite.trim().toLowerCase();
    this.OverJet = this.OverJet.trim().toLowerCase();
  }
}
