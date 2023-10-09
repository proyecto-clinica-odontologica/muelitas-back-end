import { User } from 'src/auth/entities/user.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
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

  @Column({ type: 'varchar' })
  TipoSede: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;

  @OneToMany(() => User, (usuario) => usuario.sede)
  usuario: User[];

  @ManyToOne(() => Empresa, (empresa) => empresa.sede)
  empresa: Empresa;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarDatos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.Direccion = this.Direccion?.trim().toLowerCase();
    this.Celular = this.Celular?.trim().toLowerCase();
    this.Correo = this.Correo?.trim().toLowerCase();
  }
}
