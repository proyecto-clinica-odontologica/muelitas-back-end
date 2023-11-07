import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Clase } from '../../clases/entities/clase.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  Nombre: string;

  @Column({ type: 'varchar' })
  Semestre: string;

  @Column({ type: 'varchar' })
  Malla: string;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @OneToMany(() => Clase, (clase) => clase.curso)
  clase: Clase[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
  }
}
