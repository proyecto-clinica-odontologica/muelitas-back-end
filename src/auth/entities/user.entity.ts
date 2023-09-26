import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'varchar', nullable: true })
  celular?: string;

  @Column({ type: 'varchar', nullable: true })
  foto?: string;

  @Column({ type: 'varchar', nullable: true })
  codigo?: string;

  @ManyToOne(() => Rol, (rol) => rol.usuario, { onDelete: 'CASCADE' })
  rol: Rol;

  @BeforeInsert()
  @BeforeUpdate()
  validacionCampos() {
    this.nombre = this.nombre?.toLowerCase();
    this.apellido = this.apellido?.toLowerCase();
    this.correo = this.correo?.toLowerCase();
    this.foto = this.foto?.toLowerCase();
    this.codigo = this.codigo?.toLowerCase();
  }
}
