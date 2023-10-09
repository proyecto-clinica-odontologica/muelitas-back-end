import { User } from 'src/auth/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.estudiante, {
    eager: true,
    cascade: true,
  })
  usuario: User;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.NombreCompleto = this.NombreCompleto?.trim().toLowerCase();
    this.Firma = this.Firma?.trim().toLowerCase();
  }
}
