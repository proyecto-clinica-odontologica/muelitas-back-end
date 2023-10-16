import { Curso } from 'src/cursos/entities/curso.entity';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Integrante } from 'src/integrantes/entities/integrante.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';
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
export class Clase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  Nombre: string;

  @Column({ type: 'varchar' })
  Salon: string;

  @Column({ type: 'varchar' })
  Horario: string;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToOne(() => Docente, (docente) => docente.usuario)
  docente: Docente;

  @ManyToOne(() => Curso, (curso) => curso.clase)
  curso: Curso;

  @ManyToOne(() => Periodo, (periodo) => periodo.clase)
  periodo: Periodo;

  @OneToMany(() => Integrante, (integrante) => integrante.clase)
  integrante: Integrante[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.Salon = this.Salon?.trim().toLowerCase();
    this.Horario = this.Horario?.trim().toLowerCase();
  }
}
