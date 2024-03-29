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
import { User } from '../../auth/entities/user.entity';
import { Cita } from '../../cita/entities/cita.entity';
import { Integrante } from '../../integrantes/entities/integrante.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  NombreCompleto: string;

  @Column({ type: 'varchar' })
  Firma: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @ManyToOne(() => User, (user) => user.estudiante)
  usuario: User;

  @OneToMany(() => Integrante, (integrante) => integrante.estudiante)
  integrante: Integrante[];

  @OneToMany(() => Cita, (cita) => cita.estudiante)
  citas: Cita[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.NombreCompleto = this.NombreCompleto?.trim().toLowerCase();
    this.Firma = this.Firma?.trim().toLowerCase();
  }
}
