import { ManifestacionEndodoncia } from 'src/app/manifestacion-endodoncia/entities/manifestacion-endodoncia.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ManifestacionDolor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @OneToMany(() => ManifestacionEndodoncia, (manifestacionesEndodoncias) => manifestacionesEndodoncias.manifestacionDolor)
  manifestacionesEndodoncias: ManifestacionEndodoncia[];

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Nombre = this.Nombre.trim().toLowerCase();
  }
}
