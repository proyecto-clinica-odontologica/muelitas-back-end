import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Diagnostico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  Tipo: string;

  @Column({ type: 'varchar' })
  Version: string;

  @Column()
  Codigo: number;

  @Column({ type: 'varchar' })
  Resumen: string;

  @Column({ type: 'varchar' })
  Detalle: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Tipo = this.Tipo?.trim().toLowerCase();
    this.Version = this.Version?.trim().toLowerCase();
    this.Resumen = this.Resumen?.trim().toLowerCase();
    this.Detalle = this.Detalle?.trim().toLowerCase();
  }
}
