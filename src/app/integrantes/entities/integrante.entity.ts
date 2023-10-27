import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clase } from '../../clases/entities/clase.entity';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';

@Entity()
export class Integrante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.integrante)
  estudiante: Estudiante;

  @ManyToOne(() => Clase, (clase) => clase.integrante)
  clase: Clase;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', nullable: true, default: true })
  activo?: boolean;
}
