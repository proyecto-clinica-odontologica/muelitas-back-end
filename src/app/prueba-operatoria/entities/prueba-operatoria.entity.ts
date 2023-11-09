import { Operatoria } from 'src/app/operatoria/entities/operatoria.entity';
import { Prueba } from 'src/app/prueba/entities/prueba.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PruebaOperatoria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Operatoria, (operatoria) => operatoria.pruebasOperatorias)
  operatoria: Operatoria;

  // @ManyToOne(() => Prueba, (prueba) => prueba.pruebaOperatorias)
  // prueba: Prueba;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
  }
}
