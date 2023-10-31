import { HistoriaClinica } from 'src/app/HistoriaClinica/dto/historia-clinica.entity';
import { Cita } from 'src/app/cita/entities/cita.entity';
import { Odontograma } from 'src/app/odontograma/entities/odontograma.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', nullable: false })
  ApellidoPaterno: string;

  @Column({ type: 'varchar', nullable: false })
  ApellidoMaterno: string;

  @Column({ type: 'timestamp', nullable: false })
  FechaNacimiento: Date;

  @Column({ type: 'varchar', nullable: false })
  Genero: string;

  @Column({ type: 'varchar', nullable: false, unique: true, default: '' })
  Celular: string;

  @Column({ type: 'int', nullable: false })
  Edad: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  Correo: string;

  @Column({ type: 'varchar', nullable: false })
  TipoDoc: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  NumeroDocumento: string;

  @Column({ type: 'varchar', nullable: false })
  EstadoCivil: string;

  @Column({ type: 'varchar', nullable: false })
  Ocupacion: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  GradodeInstruccion: string;

  @Column({ type: 'varchar', nullable: false })
  Domicilio: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Acompaniante: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Parentesco: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  AntecedentePatologico: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  AntecedentePersonal: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  AntecedenteFamiliar: string;

  @Column({ type: 'float', nullable: false })
  Peso: number;

  @Column({ type: 'float', nullable: false })
  Talla: number;

  @Column({ type: 'float', nullable: false })
  IMC: number;

  @Column({ type: 'varchar', nullable: false, default: '' })
  Alergias: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Piel: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Unias: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Cabello: string;

  @Column({ type: 'varchar', nullable: false })
  EnfermedadActual: string;

  @Column({ type: 'varchar', nullable: false })
  MotivoConsulta: string;

  @Column({ type: 'varchar', nullable: false })
  FuncionesBiologicas: string;

  @Column({ type: 'varchar', nullable: false })
  Orina: string;

  @Column({ type: 'varchar', nullable: false })
  Apetito: string;

  @Column({ type: 'varchar', nullable: false })
  Sueño: string;

  @Column({ type: 'varchar', nullable: false })
  Deposiciones: string;

  @Column({ type: 'varchar', nullable: false })
  Sed: string;

  @Column({ type: 'varchar', nullable: false })
  Ectoscopia: string;

  @Column({ type: 'varchar', nullable: false })
  Lugar: string;

  @Column({ type: 'varchar', nullable: false })
  Raza: string;

  @Column({ type: 'varchar', nullable: false })
  Responsable: string;

  @Column({ type: 'varchar', nullable: false })
  ParentescoConResponsable: string;

  @Column({ type: 'varchar', nullable: false })
  DomicilioResponsable: string;

  @Column({ type: 'varchar', nullable: false })
  CelularResponsable: string;

  @Column({ type: 'timestamp', nullable: false })
  FechaCreacion: Date;

  @Column({ type: 'timestamp', nullable: false })
  HoraCreacion: Date;

  @Column({ type: 'int', nullable: false })
  NumeroHistoriaclinica: number;

  //! Relaciones 
  @OneToMany(() => Cita, (citas) => citas.paciente)
  citas: Cita[];

  @OneToMany(() => Odontograma, (odontrograma) => odontrograma.paciente)
  odontrogramas: Odontograma[];

  @OneToMany(() => HistoriaClinica, (historiaClinicas) => historiaClinicas.paciente)
  historiasClinicas: HistoriaClinica[];

  // @OneToMany(() => DiagnosticoPresuntivo, (diagnosticoPresuntivo) => diagnosticoPresuntivo.paciente)
  // diagnosticoPresuntivo: DiagnosticoPresuntivo[];

  // @OneToMany(() => ExamenGeneral, (examenGeneral) => examenGeneral.paciente)
  // examenGeneral: ExamenGeneral[];

  // @OneToMany(() => Anamnesis, (anamnesis) => anamnesis.paciente)
  // anamnesis: Anamnesis[];

  // @OneToMany(() => ExamenesAuxiliares, (examenesAuxiliares) => examenesAuxiliares.paciente)
  // examenesAuxiliares: ExamenesAuxiliares[];

  // @OneToMany(() => DiagnosticoDefinitivo, (diagnosticoDefinitivo) => diagnosticoDefinitivo.paciente)
  // diagnosticoDefinitivo: DiagnosticoDefinitivo[];

  // @OneToMany(() => ExamenEstomatologico, (examenEstomatologico) => examenEstomatologico.paciente)
  // examenEstomatologico: ExamenEstomatologico[];

  // @OneToMany(() => PacienteDatosExtra, (pacienteDatosExtra) => pacienteDatosExtra.paciente)
  // pacienteDatosExtra: PacienteDatosExtra[];

  // @OneToMany(() => Interpretacion, (interpretacion) => interpretacion.paciente)
  // interpretacion: Interpretacion[];

  // @OneToMany(() => Epicrisis, (epicrisis) => epicrisis.paciente)
  // epicrisis: Epicrisis[];

  // @OneToMany(() => NotasEvolutivas, (notasEvolutivas) => notasEvolutivas.paciente)
  // notasEvolutivas: NotasEvolutivas[];

  // @OneToMany(() => PlanyCronogramaTratamiento, (planyCronogramaTratamiento) => planyCronogramaTratamiento.paciente)
  // planyCronogramaTratamiento: PlanyCronogramaTratamiento[];

  @BeforeInsert()
  @BeforeUpdate()
  validacionCampos() {
    this.Acompaniante = this.Acompaniante?.trim()?.toLowerCase();
    this.Alergias = this.Alergias?.trim()?.toLowerCase();
    this.AntecedenteFamiliar = this.AntecedenteFamiliar?.trim()?.toLowerCase();
    this.AntecedentePatologico = this.AntecedentePatologico?.trim()?.toLowerCase();
    this.AntecedentePersonal = this.AntecedentePersonal?.trim()?.toLowerCase();
    this.ApellidoMaterno = this.ApellidoMaterno?.trim()?.toLowerCase();
    this.ApellidoPaterno = this.ApellidoPaterno?.trim()?.toLowerCase();
    this.Cabello = this.Cabello?.trim()?.toLowerCase();
    this.Celular = this.Celular?.trim()?.toLowerCase();
    this.Correo = this.Correo?.trim()?.toLowerCase();
    this.Domicilio = this.Domicilio?.trim()?.toLowerCase();
    this.EstadoCivil = this.EstadoCivil?.trim()?.toLowerCase();
    this.EstadoCivil = this.EstadoCivil?.trim()?.toLowerCase();
    this.Genero = this.Genero?.trim()?.toLowerCase();
    this.GradodeInstruccion = this.GradodeInstruccion?.trim()?.toLowerCase();
    this.Nombre = this.Nombre?.trim()?.toLowerCase();
    this.NumeroDocumento = this.NumeroDocumento?.trim()?.toLowerCase();
    this.Ocupacion = this.Ocupacion?.trim()?.toLowerCase();
    this.Parentesco = this.Parentesco?.trim()?.toLowerCase();
    this.Piel = this.Piel?.trim()?.toLowerCase();
    this.TipoDoc = this.TipoDoc?.trim()?.toLowerCase();
    this.Unias = this.Unias?.trim()?.toLowerCase();
  }
}
