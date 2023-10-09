import { Curso } from 'src/cursos/entities/curso.entity';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';
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

  @ManyToOne(() => Curso, (curso) => curso.clase, {
    eager: true,
    cascade: true,
  })
  curso: Curso;

  @ManyToOne(() => Periodo, (periodo) => periodo.clase, {
    eager: true,
    cascade: true,
  })
  periodo: Periodo;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.Salon = this.Salon?.trim().toLowerCase();
    this.Horario = this.Horario?.trim().toLowerCase();
  }
}
