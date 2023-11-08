import { EstadoPostquirurgico } from 'src/app/estado-postquirurgico/entities/estado-postquirurgico.entity';
import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cirugia {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  MotivoConsulta: string;

  @Column({ type: 'varchar', length: 255 })
  DiagnosticoCIE11: string;

  @Column({ type: 'varchar', length: 255 })
  Pronostico: string;

  @Column({ type: 'varchar', length: 255 })
  PlandeTrabajo: string;

  @Column({ type: 'varchar', length: 255 })
  Cirujano: string;

  @Column({ type: 'varchar', length: 255 })
  Asistente: string;

  @Column({ type: 'varchar', length: 255 })
  Circulante: string;

  @Column({ type: 'varchar', length: 255 })
  HoraInicioCx: string;

  @Column({ type: 'varchar', length: 255 })
  HoraTerminoCx: string;

  @Column({ type: 'date' })
  FechaAlta: Date;

  @Column({ type: 'varchar', length: 255 })
  Observaciones: string;

  @Column({ type: 'varchar', length: 255 })
  EvolucionDiaria: string;

  @Column({ type: 'varchar', length: 255 })
  EstudianteCargo: string;

  @Column({ type: 'varchar', length: 255 })
  FacultativoCargo: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.cirugias)
  paciente: Paciente;

  @OneToMany(() => EstadoPostquirurgico, (estadosPostsQuirurgicos) => estadosPostsQuirurgicos.cirugia)
  estadosPostsQuirurgicos: EstadoPostquirurgico[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.MotivoConsulta = this.MotivoConsulta?.trim().toLowerCase();
    this.DiagnosticoCIE11 = this.DiagnosticoCIE11?.trim().toLowerCase();
    this.Pronostico = this.Pronostico?.trim().toLowerCase();
    this.PlandeTrabajo = this.PlandeTrabajo?.trim().toLowerCase();
    this.Cirujano = this.Cirujano?.trim().toLowerCase();
    this.Asistente = this.Asistente?.trim().toLowerCase();
    this.Circulante = this.Circulante?.trim().toLowerCase();
    this.HoraInicioCx = this.HoraInicioCx?.trim().toLowerCase();
    this.HoraTerminoCx = this.HoraTerminoCx?.trim().toLowerCase();
    this.Observaciones = this.Observaciones?.trim().toLowerCase();
    this.EvolucionDiaria = this.EvolucionDiaria?.trim().toLowerCase();
    this.EstudianteCargo = this.EstudianteCargo?.trim().toLowerCase();
    this.FacultativoCargo = this.FacultativoCargo?.trim().toLowerCase();
  }
}
