/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'historia_clinica' })
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'motivo_consulta' })
  motivoConsulta: string;

  @Column({ type: 'varchar', length: 100, name: 'enfermedad_actual' })
  enfermedadActual: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'presion_arterial' })
  presionArterial: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'frecuencia_respiratoria' })
  frecuenciaRespiratoria: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'pulso' })
  pulso: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'temperatura' })
  temperatura: number;
}