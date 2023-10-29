import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExamenIntrabucal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Temporal: string;

  @Column({ type: 'varchar', length: 255 })
  Masetero: string;

  @Column({ type: 'varchar', length: 255 })
  PteriogoideoInterno: string;

  @Column({ type: 'varchar', length: 255 })
  PteriogoideoExterno: string;

  @Column({ type: 'varchar', length: 255 })
  Digastrico: string;

  @Column({ type: 'varchar', length: 255 })
  Esternocleidomastoideo: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Temporal = this.Temporal?.trim().toLowerCase();
    this.Masetero = this.Masetero?.trim().toLowerCase();
    this.PteriogoideoInterno = this.PteriogoideoInterno?.trim().toLowerCase();
    this.PteriogoideoExterno = this.PteriogoideoExterno?.trim().toLowerCase();
    this.Digastrico = this.Digastrico?.trim().toLowerCase();
    this.Esternocleidomastoideo = this.Esternocleidomastoideo?.trim().toLowerCase();
  }
}
