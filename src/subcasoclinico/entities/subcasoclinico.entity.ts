import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CasoClinico } from '../../casosclinicos/entities/casoclinico.entity';
@Entity()
export class SubCasoClinico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 60 })
  Nombre: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => CasoClinico, (casoclinico) => casoclinico.subCasosClinicos)
  casoClinico: CasoClinico;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.trim().toLowerCase();
  }
}
