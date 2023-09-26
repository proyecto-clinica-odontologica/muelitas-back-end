import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Rol {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, default: 'estudiante' })
  nombre: string;

  @OneToMany(() => User, (user) => user.rol, { cascade: true })
  usuario: User[];

  @BeforeInsert()
  @BeforeInsert()
  validacionCampos() {
    this.nombre = this.nombre?.toLowerCase();
  }
}
