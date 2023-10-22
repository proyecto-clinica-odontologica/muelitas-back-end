import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistoriaClinica {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  MotivoConsulta: string;

  @Column({ type: 'varchar', length: 255 })
  EnfermedadActual: string;

  @Column({ type: 'decimal' })
  PresionArterial: number;

  @Column({ type: 'decimal' })
  FrecuenciaRespiratoria: number;

  @Column({ type: 'decimal' })
  Pulso: number;

  @Column({ type: 'decimal' })
  Temperatura: number;
}
