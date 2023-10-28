import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

export class DiagnosticoDefinitivo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Diagnostico: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  limpiarCampos() {
    this.Diagnostico = this.Diagnostico?.trim().toLowerCase();
  }

  @BeforeRemove()
  handleBeforeRemove() {
    this.activo = false;
  }
}
