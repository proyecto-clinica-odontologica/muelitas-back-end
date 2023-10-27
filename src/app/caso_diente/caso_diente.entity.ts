import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Diente } from '../dientes/diente.entity';

@Entity()
export class Caso_Diente {
  @PrimaryGeneratedColumn()
  idCasoDiente: number;

  @Column()
  Nombre: string;

  @Column()
  Foto: string;

  @Column()
  idDiente: number;

  @ManyToOne(() => Diente, (diente) => diente.caso_diente) // Muchos a Uno
  diente: Diente;
}
