import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  apellido: string;

  @Column({ type: 'varchar' })
  numDocumento: string;

  @Column({ type: 'varchar' })
  contra: string;

  @Column({ type: 'varchar', unique: true })
  correo: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  celular?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  foto?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  codigo?: string;

  @Column({ type: 'varchar', nullable: true, default: 'estudiante' })
  rol?: string;

  @BeforeInsert()
  @BeforeUpdate()
  validacionCampos() {
    this.nombre = this.nombre?.toLowerCase();
    this.apellido = this.apellido?.toLowerCase();
    this.correo = this.correo?.toLowerCase();
    this.foto = this.foto?.toLowerCase();
    this.codigo = this.codigo?.toLowerCase();
    this.rol = this.rol?.toLowerCase();
  }
}
