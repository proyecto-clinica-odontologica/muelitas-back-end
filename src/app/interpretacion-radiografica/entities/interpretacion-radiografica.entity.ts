import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cirugia } from '../../cirugia/entities/cirugia.entity';

@Entity()
export class InterpretacionRadiografica {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'varchar', length: 255 })
  Detalle: string;

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
    this.Detalle = this.Detalle?.trim().toLowerCase();
  }
}
