import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DiagnosticoPresuntivo {
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
}
