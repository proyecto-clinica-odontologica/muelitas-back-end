import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carasdiente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Nombre: string;

  @Column({ type: 'varchar', length: 50 })
  Lado1: string;

  @Column({ type: 'varchar', length: 50 })
  Lado2: string;

  @Column({ type: 'varchar', length: 50 })
  Lado3: string;

  @Column({ type: 'varchar', length: 50 })
  Lado4: string;

  @Column({ type: 'varchar', length: 50 })
  Lado5: string;

  @Column({ type: 'varchar', length: 50 })
  Lado6: string;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.Lado1 = this.Lado1?.trim().toLowerCase();
    this.Lado2 = this.Lado2?.trim().toLowerCase();
    this.Lado3 = this.Lado3?.trim().toLowerCase();
    this.Lado4 = this.Lado4?.trim().toLowerCase();
    this.Lado5 = this.Lado5?.trim().toLowerCase();
    this.Lado6 = this.Lado6?.trim().toLowerCase();
  }
}
