import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';

@Entity()
export class Seguimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @ManyToOne(() => Cita, (cita) => cita.seguimientos)
  cita: Cita;
}
