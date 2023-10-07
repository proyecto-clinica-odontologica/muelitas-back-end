import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sede {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  Nombre: string;

  @Column({ type: 'varchar' })
  Direccion: string;

  @Column({ type: 'varchar', unique: true })
  Celular: string;

  @Column({ type: 'varchar', unique: true })
  Correo: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarDatos() {
    this.Nombre = this.Nombre?.toLowerCase();
    this.Direccion = this.Direccion?.toLowerCase();
    this.Celular = this.Celular?.toLowerCase();
    this.Correo = this.Correo?.toLowerCase();
  }
}
