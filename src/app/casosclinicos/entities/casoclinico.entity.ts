import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCasoClinico } from '../../subcasoclinico/entities/subcasoclinico.entity';
@Entity()
export class CasoClinico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 60 })
  Nombre: string;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @OneToMany(() => SubCasoClinico, (subCasosClinicos) => subCasosClinicos.casoClinico)
  subCasosClinicos: SubCasoClinico[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre?.toLowerCase();
  }
}
