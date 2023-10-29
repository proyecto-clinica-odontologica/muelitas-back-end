import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Oclusion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  RelacionMolarDerecha: string;

  @Column({ type: 'varchar', length: 255 })
  RelacionMolarIzquierda: string;

  @Column({ type: 'varchar', length: 255 })
  RelacionCaninaDerecha: string;

  @Column({ type: 'varchar', length: 255 })
  RelacionCaninaIzquierda: string;

  @Column({ type: 'varchar', length: 255 })
  GradoDeApertura: string;

  @Column({ type: 'varchar', length: 255 })
  OverBite: string;

  @Column({ type: 'varchar', length: 255 })
  OverJet: string;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.RelacionMolarDerecha = this.RelacionMolarDerecha.trim().toLowerCase();
    this.RelacionMolarIzquierda = this.RelacionMolarIzquierda.trim().toLowerCase();
    this.RelacionCaninaDerecha = this.RelacionCaninaDerecha.trim().toLowerCase();
    this.RelacionCaninaIzquierda = this.RelacionCaninaIzquierda.trim().toLowerCase();
    this.GradoDeApertura = this.GradoDeApertura.trim().toLowerCase();
    this.OverBite = this.OverBite.trim().toLowerCase();
    this.OverJet = this.OverJet.trim().toLowerCase();
  }
}
