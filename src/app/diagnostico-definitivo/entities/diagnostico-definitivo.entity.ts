import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DiagnosticoDefinitivo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Diagnostico: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.diagnosticosDefinitivos)
  paciente: Paciente;

  @BeforeUpdate()
  @BeforeInsert()
  limpiarCampos() {
    this.Diagnostico = this.Diagnostico?.trim().toLowerCase();
  }
}
