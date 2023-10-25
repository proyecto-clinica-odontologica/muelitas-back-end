import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  NombreCompleto: string;

  @Column({ type: 'varchar', unique: true })
  CodigoAcceso: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  Activo?: boolean;

  @Column({ type: 'varchar', nullable: true })
  Pago?: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.administrador)
  usuario: User;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.NombreCompleto = this.NombreCompleto?.trim().toLowerCase();
    this.CodigoAcceso = this.CodigoAcceso?.trim().toLowerCase();
  }
}
