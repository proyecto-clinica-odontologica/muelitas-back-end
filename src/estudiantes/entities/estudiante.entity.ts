import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 60 })
  NombreCompleto: string;

  @Column({ type: 'varchar' })
  Rubrica: string;

  @Column({ type: 'varchar', length: 8, unique: true })
  dni: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  activo?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.NombreCompleto = this.NombreCompleto?.toLowerCase();
    this.Rubrica = this.Rubrica?.toLowerCase();
  }
}
