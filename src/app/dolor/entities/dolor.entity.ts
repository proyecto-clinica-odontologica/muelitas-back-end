import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dolor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Temporal: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Masetero: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PteriogoideoInterno: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PteriogoideoExterno: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Digastrico: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Esternocleidomastoideo: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: null, nullable: true })
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
