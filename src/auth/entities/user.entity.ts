import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'bool' })
  isActive: boolean; // bloquear el acceso, seria como eliminar un usuario

  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[]; // ['admin', 'user']
}
