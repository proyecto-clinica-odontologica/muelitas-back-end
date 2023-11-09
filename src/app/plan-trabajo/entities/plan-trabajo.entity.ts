import { Operatoria } from 'src/app/operatoria/entities/operatoria.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlanTrabajo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  Cantidad: number;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'varchar', length: 255 })
  Tratamiento: string;

  @Column({ type: 'varchar', length: 255 })
  PiezaNumero: string;

  @Column({ type: 'varchar', length: 255 })
  TipoMaterialRestaurador: string;

  @ManyToOne(() => Operatoria, (operatoria) => operatoria.planesDeTrabajo)
  operatoria: Operatoria;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Tratamiento = this.Tratamiento?.trim().toLowerCase();
    this.PiezaNumero = this.PiezaNumero?.trim().toLowerCase();
    this.TipoMaterialRestaurador = this.TipoMaterialRestaurador?.trim().toLowerCase();
  }
}
