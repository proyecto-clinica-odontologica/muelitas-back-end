import { Odontograma } from 'src/odontograma/entities/odontograma.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mapeo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @ManyToOne(() => Odontograma, (odontograma) => odontograma.mapeos)
  odontograma: Odontograma;
}
