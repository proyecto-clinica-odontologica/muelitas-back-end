import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class PlanyCronogramaTratamiento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Resumen: string;

  @Column({ type: 'varchar', length: 255 })
  Especificaciones: string;

  @Column({ type: 'varchar', length: 255 })
  Observaciones: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.planyCronogramasTratamientos)
  paciente: Paciente;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Resumen = this.Resumen?.trim().toLowerCase();
    this.Especificaciones = this.Especificaciones?.trim().toLowerCase();
    this.Observaciones = this.Observaciones?.trim().toLowerCase();
  }
}
