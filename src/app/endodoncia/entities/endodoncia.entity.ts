import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endodoncia {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date', nullable: false })
  Fecha: Date;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  MotivoConsulta: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  PiezaDental: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ECPercusion: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ECCavidad: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ECCambioColor: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ECTejidosBlandos: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ECTermoreaccion: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ECElectroReaccion: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ERCavidad: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ERTratamientoPrevio: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ERPeriodyro: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ERLesionesPeriauriculares: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ERNumerodeConductos: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  ERPresipitacionesCalcitas: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  STAAnestecia: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  STAAislamientoAbsoluto: string;

  @Column({ type: 'date', nullable: false })
  FechaRegistro: Date;

  @Column({ type: 'boolean', nullable: false, default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.endodoncias)
  paciente: Paciente;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.MotivoConsulta = this.MotivoConsulta?.trim().toLowerCase();
    this.PiezaDental = this.PiezaDental?.trim().toLowerCase();
    this.ECPercusion = this.ECPercusion?.trim().toLowerCase();
    this.ECCavidad = this.ECCavidad?.trim().toLowerCase();
    this.ECCambioColor = this.ECCambioColor?.trim().toLowerCase();
    this.ECTejidosBlandos = this.ECTejidosBlandos?.trim().toLowerCase();
    this.ECTermoreaccion = this.ECTermoreaccion?.trim().toLowerCase();
    this.ECElectroReaccion = this.ECElectroReaccion?.trim().toLowerCase();
    this.ERCavidad = this.ERCavidad?.trim().toLowerCase();
    this.ERTratamientoPrevio = this.ERTratamientoPrevio?.trim().toLowerCase();
    this.ERPeriodyro = this.ERPeriodyro?.trim().toLowerCase();
    this.ERLesionesPeriauriculares = this.ERLesionesPeriauriculares?.trim().toLowerCase();
    this.ERNumerodeConductos = this.ERNumerodeConductos?.trim().toLowerCase();
    this.ERPresipitacionesCalcitas = this.ERPresipitacionesCalcitas?.trim().toLowerCase();
    this.STAAnestecia = this.STAAnestecia?.trim().toLowerCase();
    this.STAAislamientoAbsoluto = this.STAAislamientoAbsoluto?.trim().toLowerCase();
  }
}
