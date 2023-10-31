import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HistoriaClinica } from '../../HistoriaClinica/dto/historia-clinica.entity';
import { Anamnesis } from '../../anamnesis/entities/anamnesis.entity';
import { Cita } from '../../cita/entities/cita.entity';
import { DiagnosticoDefinitivo } from '../../diagnostico-definitivo/entities/diagnostico-definitivo.entity';
import { DiagnosticoPresuntivo } from '../../diagnostico-presuntivo/entities/diagnostico-presuntivo.entity';
import { Epicrisis } from '../../epicrisis/entities/epicrisis.entity';
import { ExamenAuxiliar } from '../../examen-auxiliar/entities/examen-auxiliar.entity';
import { ExamenEstomatologico } from '../../examen-estomatologico/entities/examen-estomatologico.entity';
import { ExamenGeneral } from '../../examen-general/entities/examen-general.entity';
import { Interpretacion } from '../../interpretacion/entities/interpretacion.entity';
import { NotaEvolutiva } from '../../nota-evolutiva/entities/nota-evolutiva.entity';
import { Odontograma } from '../../odontograma/entities/odontograma.entity';
import { PlanyCronogramaTratamiento } from '../../planycronograma-tratamiento/entities/planycronograma-tratamiento.entity';

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

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  //! Relaciones
  @OneToMany(() => Cita, (citas) => citas.paciente)
  citas: Cita[];

  @OneToMany(() => Odontograma, (odontrograma) => odontrograma.paciente)
  odontrogramas: Odontograma[];

  @OneToMany(() => HistoriaClinica, (historiaClinicas) => historiaClinicas.paciente)
  historiasClinicas: HistoriaClinica[];

  @OneToMany(() => DiagnosticoPresuntivo, (diagnosticosPresuntivos) => diagnosticosPresuntivos.paciente)
  diagnosticosPresuntivos: DiagnosticoPresuntivo[];

  @OneToMany(() => ExamenAuxiliar, (examenesAuxiliares) => examenesAuxiliares.paciente)
  examenesAuxiliares: ExamenAuxiliar[];

  @OneToMany(() => ExamenGeneral, (examenesGenerales) => examenesGenerales.paciente)
  examenesGenerales: ExamenGeneral[];

  @OneToMany(() => Anamnesis, (anamnesis) => anamnesis.paciente)
  anamnesis: Anamnesis[];

  @OneToMany(() => DiagnosticoDefinitivo, (diagnosticoDefinitivos) => diagnosticoDefinitivos.paciente)
  diagnosticosDefinitivos: DiagnosticoDefinitivo[];

  @OneToMany(() => ExamenEstomatologico, (examenEstomatologico) => examenEstomatologico.paciente)
  examenEstomatologico: ExamenEstomatologico[];

  @OneToMany(() => NotaEvolutiva, (notasEvolutivas) => notasEvolutivas.paciente)
  notasEvolutivas: NotaEvolutiva[];

  @OneToMany(() => PlanyCronogramaTratamiento, (planyCronogramasTratamientos) => planyCronogramasTratamientos.paciente)
  planyCronogramasTratamientos: PlanyCronogramaTratamiento[];

  @OneToMany(() => Epicrisis, (epicrisis) => epicrisis.paciente)
  epicrisis: Epicrisis[];

  @OneToMany(() => Interpretacion, (interpretaciones) => interpretaciones.paciente)
  interpretaciones: Interpretacion[];

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
