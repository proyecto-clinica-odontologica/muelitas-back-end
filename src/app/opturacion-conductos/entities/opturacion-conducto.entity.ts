import { Endodoncia } from 'src/app/endodoncia/entities/endodoncia.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OpturacionConducto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Conducto: string;

  @Column({ type: 'varchar', length: 255 })
  Tecnica: string;

  @Column({ type: 'varchar', length: 255 })
  UltimaLongituddeTrabajo: string;

  @Column({ type: 'varchar', length: 255 })
  ConoMaestro: string;

  @Column({ type: 'varchar', length: 255 })
  Referencia: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Endodoncia, (endodoncia) => endodoncia.obturacionesConductos)
  endodoncia: Endodoncia;

  @BeforeUpdate()
  @BeforeInsert()
  limpiarCampos() {
    this.Conducto = this.Conducto?.trim().toLowerCase();
    this.Tecnica = this.Tecnica?.trim().toLowerCase();
    this.UltimaLongituddeTrabajo = this.UltimaLongituddeTrabajo?.trim().toLowerCase();
    this.ConoMaestro = this.ConoMaestro?.trim().toLowerCase();
    this.Referencia = this.Referencia?.trim().toLowerCase();
  }
}
