import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  apellido: string;

  @Column({ type: 'varchar' })
  numDocumento: string;

  @Column({ type: 'varchar' })
  contra: string;

  @Column({ type: 'varchar', unique: true })
  correo: string;

  @Column({ type: 'varchar', nullable: true })
  celular?: string;

  @Column({ type: 'varchar', nullable: true })
  foto?: string;

  @Column({ type: 'varchar', nullable: true })
  codigo?: string;
}
