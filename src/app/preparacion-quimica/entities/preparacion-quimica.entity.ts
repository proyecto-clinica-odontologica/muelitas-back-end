import { Endodoncia } from 'src/app/endodoncia/entities/endodoncia.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PreparacionQuimica {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Conducto: string;

  @Column({ type: 'varchar', length: 255 })
  Tecnica: string;

  @Column({ type: 'varchar', length: 255 })
  IFinal: string;

  @Column({ type: 'varchar', length: 255 })
  UltmaLongituddeTrabajo: string;

  @Column({ type: 'varchar', length: 255 })
  Referencia: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Endodoncia, (endodoncia) => endodoncia.preparacionesQuimicas)
  endodoncia: Endodoncia;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Conducto = this.Conducto?.trim().toLowerCase();
    this.Tecnica = this.Tecnica?.trim().toLowerCase();
    this.IFinal = this.IFinal?.trim().toLowerCase();
    this.UltmaLongituddeTrabajo = this.UltmaLongituddeTrabajo?.trim().toLowerCase();
    this.Referencia = this.Referencia?.trim().toLowerCase();
  }
}
