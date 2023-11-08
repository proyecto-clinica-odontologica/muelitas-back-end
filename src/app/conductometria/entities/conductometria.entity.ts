import { Endodoncia } from 'src/app/endodoncia/entities/endodoncia.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conductometria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Conducto: string;

  @Column({ type: 'varchar', length: 255 })
  LongRx: string;

  @Column({ type: 'varchar', length: 255 })
  LongTrabajo: string;

  @Column({ type: 'varchar', length: 255 })
  Inicial: string;

  @Column({ type: 'varchar', length: 255 })
  Referencia: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Endodoncia, (endodoncia) => endodoncia.conductometria)
  endodoncia: Endodoncia;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Conducto = this.Conducto?.trim().toLowerCase();
    this.LongRx = this.LongRx?.trim().toLowerCase();
    this.LongTrabajo = this.LongTrabajo?.trim().toLowerCase();
    this.Inicial = this.Inicial?.trim().toLowerCase();
    this.Referencia = this.Referencia?.trim().toLowerCase();
  }
}
