import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';

@Entity()
export class Tratamiento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @OneToMany(() => Cita, (citas) => citas.tratamiento)
  citas: Cita[];
}
