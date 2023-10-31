import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotaEvolutiva {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  Fecha: Date;

  @Column({ type: 'varchar', length: 255 })
  Tratamiento: string;

  @Column({ type: 'varchar', length: 255 })
  Firma: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.notasEvolutivas)
  paciente: Paciente;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Tratamiento = this.Tratamiento?.trim().toLowerCase();
    this.Firma = this.Firma?.trim().toLowerCase();
  }
}
