import { Sede } from 'src/sedes/entities/sede.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  Representante: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  RazonSocial: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  Ruc: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @OneToMany(() => Sede, (sede) => sede.empresa)
  sede: Sede[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Representante = this.Representante?.trim().toLowerCase();
    this.RazonSocial = this.RazonSocial?.trim().toLowerCase();
  }
}
