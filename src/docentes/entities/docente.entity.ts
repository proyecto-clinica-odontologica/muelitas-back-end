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
import { Clase } from '../../clases/entities/clase.entity';

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

  @ManyToOne(() => User, (usuario) => usuario.docente)
  usuario: User;

  @OneToMany(() => Clase, (clase) => clase.docente)
  clases: Clase[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Colegiatura = this.Colegiatura?.toLowerCase();
    this.NombreCompleto = this.NombreCompleto?.toLowerCase();
    this.FirmaDigital = this.FirmaDigital?.toLowerCase();
  }
}
