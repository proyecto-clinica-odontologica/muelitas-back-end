import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { PruebaOperatoria } from '../../prueba-operatoria/entities/prueba-operatoria.entity';

@Entity()
export class Operatoria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  MotivoConsulta: string;

  @Column({ type: 'varchar', length: 255 })
  DiagnosticoDefinitivo: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.operatorias)
  paciente: Paciente;

  @OneToMany(() => PruebaOperatoria, (pruebasOperatorias) => pruebasOperatorias.operatoria)
  pruebasOperatorias: PruebaOperatoria[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.MotivoConsulta = this.MotivoConsulta?.trim().toLowerCase();
    this.DiagnosticoDefinitivo = this.DiagnosticoDefinitivo?.trim().toLowerCase();
  }
}
