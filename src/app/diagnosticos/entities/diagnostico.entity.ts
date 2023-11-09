import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diagnostico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Tipo: string;

  @Column({ type: 'varchar', length: 255 })
  Version: string;

  @Column({ type: 'varchar', length: 255 })
  Codigo: string;

  @Column({ type: 'varchar', length: 255 })
  Resumen: string;

  @Column({ type: 'varchar', length: 255 })
  Detalle: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Tipo = this.Tipo?.trim().toLowerCase();
    this.Codigo = this.Codigo?.trim().toLowerCase();
    this.Version = this.Version?.trim().toLowerCase();
    this.Resumen = this.Resumen?.trim().toLowerCase();
    this.Detalle = this.Detalle?.trim().toLowerCase();
  }
}
