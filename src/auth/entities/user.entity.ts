import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  apellido: string;

  @Column({ type: 'text' })
  numDocumento: string;

  @Column({ type: 'text' })
  contra: string;

  @Column({ type: 'text', unique: true })
  correo: string;

  @Column({ type: 'text', nullable: true })
  celular: string;

  @Column({ type: 'text', nullable: true })
  foto: string;

  @Column({ type: 'text', nullable: true })
  codigo: string;
}
