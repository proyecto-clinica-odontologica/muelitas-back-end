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
export class Docente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 60 })
  Colegiatura: string;

  @Column({ type: 'varchar', length: 255 })
  NombreCompleto: string;

  @Column({ type: 'varchar', unique: true })
  FirmaDigital: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @ManyToOne(() => User, (usuario) => usuario.docente, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  usuario: User;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Colegiatura = this.Colegiatura?.toLowerCase();
    this.NombreCompleto = this.NombreCompleto?.toLowerCase();
    this.FirmaDigital = this.FirmaDigital?.toLowerCase();
  }
}
