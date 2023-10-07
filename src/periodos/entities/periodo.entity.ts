import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Periodo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar'})
  Nombre: string;

  @Column({ type: 'date' })
  FechaInicio: string;

  @Column({ type: 'date' })
  FechaFin: string;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
