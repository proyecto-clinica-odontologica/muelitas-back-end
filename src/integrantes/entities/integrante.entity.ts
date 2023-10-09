import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Integrante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.integrante, {
    eager: true,
    cascade: true,
  })
  estudiante: Estudiante;

  @ManyToOne(() => Clase, (clase) => clase.integrante, {
    eager: true,
    cascade: true,
  })
  clase: Clase;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', nullable: true, default: true })
  activo?: boolean;
}
