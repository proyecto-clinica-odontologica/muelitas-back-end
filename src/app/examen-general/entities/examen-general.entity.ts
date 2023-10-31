import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExamenGeneral {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  Peso: number;

  @Column({ type: 'numeric' })
  Talla: number;

  @Column({ type: 'numeric' })
  IndiceMasaCorporal: number;

  @Column({ type: 'varchar' })
  Piel: string;

  @Column({ type: 'varchar' })
  AnexosCabello: string;

  @Column({ type: 'varchar' })
  AnexosUnias: string;

  @Column({ type: 'varchar' })
  PresionArterial: string;

  @Column({ type: 'numeric' })
  FrecuenciaRespiratoria: number;

  @Column({ type: 'numeric' })
  Pulso: number;

  @Column({ type: 'numeric' })
  Temperatura: number;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToOne(() => Paciente, (paciente) => paciente.examenesGenerales)
  paciente: Paciente;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Piel = this.Piel?.trim().toLowerCase();
    this.AnexosCabello = this.AnexosCabello?.trim().toLowerCase();
    this.AnexosUnias = this.AnexosUnias?.trim().toLowerCase();
    this.PresionArterial = this.PresionArterial?.trim().toLowerCase();
  }
}
