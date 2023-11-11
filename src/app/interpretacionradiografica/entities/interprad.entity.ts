import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { Cirugia } from '../cirugia/entities/cirugia.entity';

@Entity()
export class InterpRad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  Nombre: string;

  @Column({ type: 'varchar' })
  Detalle: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  //@ManyToOne(() => Cirugia, (cirugia) => cirugia.interprad)
  //cirugia: Cirugia;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
    this.Detalle = this.Detalle?.trim().toLowerCase();
  }
}
