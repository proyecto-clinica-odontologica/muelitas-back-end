import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interpretacion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  RadiografiaPanoramica: string;

  @Column({ type: 'varchar', length: 255 })
  HemogramaCompleto: string;

  @Column({ type: 'varchar', length: 255 })
  TiempoSangrado: string;

  @Column({ type: 'varchar', length: 255 })
  TiempoCoagulacion: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.RadiografiaPanoramica = this.RadiografiaPanoramica?.trim().toLowerCase();
    this.HemogramaCompleto = this.HemogramaCompleto?.trim().toLowerCase();
    this.TiempoSangrado = this.TiempoSangrado?.trim().toLowerCase();
    this.TiempoCoagulacion = this.TiempoCoagulacion?.trim().toLowerCase();
  }
}
