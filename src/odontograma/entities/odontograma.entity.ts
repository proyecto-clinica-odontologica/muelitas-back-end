import { Mapeo } from '../../mapeo/entities/mapeo.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Odontograma {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  Nombre: string;

  @Column({ type: 'varchar' })
  Estado: string;

  @Column({ type: 'numeric', nullable: false })
  Numero: number;

  @ManyToOne(() => Paciente, (Paciente) => Paciente.odontrogramas)
  paciente: Paciente;

  @OneToMany(() => Mapeo, (mapeos) => mapeos.odontograma)
  mapeos: Mapeo[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim()?.toLowerCase();
    this.Estado = this.Estado?.trim()?.toLowerCase();
  }
}
