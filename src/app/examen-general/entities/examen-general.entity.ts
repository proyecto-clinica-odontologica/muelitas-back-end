import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class ExamenGeneral {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'number' })
  Peso: number;

  @Column({ type: 'number' })
  Talla: number;

  @Column({ type: 'number' })
  IndiceMasaCorporal: number;

  @Column({ type: 'varchar' })
  Piel: string;

  @Column({ type: 'varchar' })
  AnexosCabello: string;

  @Column({ type: 'varchar' })
  AnexosUnias: string;

  @Column({ type: 'varchar' })
  PresionArterial: string;

  @Column({ type: 'number' })
  FrecuenciaRespiratoria: number;

  @Column({ type: 'number' })
  Pulso: number;

  @Column({ type: 'number' })
  Temperatura: number;

  @DeleteDateColumn({ type: 'date', default: null, nullable: true })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Piel = this.Piel?.trim().toLowerCase();
    this.AnexosCabello = this.AnexosCabello?.trim().toLowerCase();
    this.AnexosUnias = this.AnexosUnias?.trim().toLowerCase();
    this.PresionArterial = this.PresionArterial?.trim().toLowerCase();
  }
}
