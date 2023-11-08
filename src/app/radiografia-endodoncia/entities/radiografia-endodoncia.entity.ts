import { Endodoncia } from 'src/app/endodoncia/entities/endodoncia.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RadiografiaEndodoncia {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  Fecha: Date;

  @Column({ type: 'varchar', length: 255 })
  Foto: string;

  @Column({ type: 'varchar', length: 255 })
  Interpretacion: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Endodoncia, (endodoncia) => endodoncia.radiografiasEndodoncias)
  endodoncia: Endodoncia;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Foto = this.Foto?.trim().toLowerCase();
    this.Interpretacion = this.Interpretacion?.trim().toLowerCase();
  }
}
