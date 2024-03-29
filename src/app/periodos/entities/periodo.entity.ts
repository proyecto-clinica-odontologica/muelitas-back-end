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
import { Clase } from '../../clases/entities/clase.entity';
import { Sede } from '../../sedes/entities/sede.entity';

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

  @ManyToOne(() => Sede, (sede) => sede.periodo)
  sede: Sede;

  @OneToMany(() => Clase, (clase) => clase.periodo)
  clase: Clase[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.FechaInicio = this.FechaInicio?.trim().toLowerCase();
    this.FechaFin = this.FechaFin?.trim().toLowerCase();
  }
}
