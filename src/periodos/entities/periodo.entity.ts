import { Sede } from 'src/sedes/entities/sede.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Periodo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  Nombre: string;

  @Column({ type: 'date' })
  FechaInicio: string;

  @Column({ type: 'date' })
  FechaFin: string;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToOne(() => Sede, (sede) => sede.periodo, {
    eager: true,
    cascade: true,
  })
  sede: Sede;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.FechaInicio = this.FechaInicio?.trim().toLowerCase();
    this.FechaFin = this.FechaFin?.trim().toLowerCase();
  }
}
