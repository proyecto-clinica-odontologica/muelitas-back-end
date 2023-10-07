import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  Nombre: string;

  @Column({ type: 'varchar' })
  Apellido: string;

  @Column({ type: 'varchar' })
  Contra: string;

  @Column({ type: 'varchar', unique: true })
  Correo: string;

  @Column({ type: 'varchar', unique: true })
  NumDoc: string;

  @Column({ type: 'varchar', unique: true })
  Celular: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Foto?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Codigo?: string;

  @Column({ type: 'varchar', nullable: true, default: 'estudiante' })
  Rol?: string;

  @Column({ type: 'varchar', nullable: true, default: 'desactivado' })
  RestablecerContra?: string;

  @Column({ type: 'varchar', nullable: true, default: 'pagado' })
  Pago?: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  activo?: boolean;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.usuario, {
    cascade: true,
  })
  estudiante?: Estudiante[];

  @Column({ type: 'varchar', default: 'dni' })
  TipoDocumento: string;

  @Column({ type: 'varchar', default: 'masculino' })
  Genero: string;

  @BeforeInsert()
  @BeforeUpdate()
  validacionCampos() {
    this.Nombre = this.Nombre?.toLowerCase();
    this.Apellido = this.Apellido?.toLowerCase();
    this.Correo = this.Correo?.toLowerCase();
    this.Foto = this.Foto?.toLowerCase();
    this.Codigo = this.Codigo?.toLowerCase();
    this.Rol = this.Rol?.toLowerCase();
  }
}
