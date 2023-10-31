import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Anamnesis {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Contenido: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;

  @ManyToOne(() => Paciente,(paciente) => paciente.anamnesis)
  paciente: Paciente;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Contenido = this.Contenido?.trim().toLowerCase();
  }
}
