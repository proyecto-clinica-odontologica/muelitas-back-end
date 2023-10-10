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
export class Administrador {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  NombreCompleto: string;

  @Column({ type: 'varchar', unique: true })
  CodigoAcceso: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @ManyToOne(() => User, (user) => user.administrador, {
    eager: true,
  })
  usuario: User;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.NombreCompleto = this.NombreCompleto?.toLowerCase();
    this.CodigoAcceso = this.CodigoAcceso?.toLowerCase();
  }
}
