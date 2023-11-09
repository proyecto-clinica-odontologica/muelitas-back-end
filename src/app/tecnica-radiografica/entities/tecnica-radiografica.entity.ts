import { Operatoria } from 'src/app/operatoria/entities/operatoria.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TecnicaRadiografica {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  NumeroPieza: number;

  @Column({ type: 'varchar', length: 255 })
  Detalle: string;

  @Column({ type: 'varchar', length: 255 })
  Tipo: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Operatoria, (operatoria) => operatoria.tecnicasRadiograficas)
  operatoria: Operatoria;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Detalle = this.Detalle?.trim().toLowerCase();
    this.Tipo = this.Tipo?.trim().toLowerCase();
  }
}
