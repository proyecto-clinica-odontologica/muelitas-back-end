import { Cirugia } from 'src/app/cirugia/entities/cirugia.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RadiografiaCirugia {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  Fecha: Date;

  @Column({ type: 'varchar', length: 255 })
  Foto: string;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'varchar', length: 255 })
  Interpretacion: string;

  @Column({ type: 'date' })
  FechaRegistro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Cirugia, (cirugia) => cirugia.estadosPostsQuirurgicos)
  cirugia: Cirugia;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.Interpretacion = this.Interpretacion?.trim().toLowerCase();
    this.Foto = this.Foto?.trim().toLowerCase();
  }
}
