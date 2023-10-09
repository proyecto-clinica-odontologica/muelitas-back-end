import { Docente } from 'src/docentes/entities/docente.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Sede } from 'src/sedes/entities/sede.entity';
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

  @OneToMany(() => Estudiante, (estudiante) => estudiante.usuario)
  estudiante?: Estudiante[];

  @OneToMany(() => Docente, (docente) => docente.usuario, {
    onDelete: 'CASCADE',
  })
  docente: Docente[];

  @Column({ type: 'varchar', default: 'dni' })
  TipoDocumento: string;

  @Column({ type: 'varchar', default: 'masculino' })
  Genero: string;

  @ManyToOne(() => Sede, (sede) => sede.usuario)
  sede: Sede;

  @BeforeInsert()
  @BeforeUpdate()
  validacionCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.Apellido = this.Apellido?.trim().toLowerCase();
    this.Correo = this.Correo?.trim().toLowerCase();
    this.Foto = this.Foto?.trim().toLowerCase();
    this.Codigo = this.Codigo?.trim().toLowerCase();
    this.Rol = this.Rol?.trim().toLowerCase();
  }
}
