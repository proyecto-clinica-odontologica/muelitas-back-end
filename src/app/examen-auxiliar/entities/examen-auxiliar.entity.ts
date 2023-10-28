import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class ExamenAuxiliar {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Contenido: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'date', nullable: true, default: null })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Contenido = this.Contenido?.trim().toLowerCase();
  }

  @BeforeRemove()
  handleBeforeRemove() {
    this.activo = false;
  }
}
