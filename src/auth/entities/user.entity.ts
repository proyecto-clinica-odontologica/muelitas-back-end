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
  Nombre: string;

  @Column({ type: 'varchar' })
  Apellido: string;

  @Column({ type: 'varchar' })
  Contra: string;

  @Column({ type: 'varchar', unique: true })
  Correo: string;

  @Column({ type: 'varchar', unique: true })
  NumDoc: string;

  @Column({ type: 'varchar', unique: true, nullable: true, default: '' })
  Celular?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Foto?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  Codigo?: string;

  @Column({ type: 'varchar', nullable: true, default: 'estudiante' })
  Rol?: string;

  @Column({ type: 'uuid', nullable: true, default: null })
  RestablecerContra?: string;

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
