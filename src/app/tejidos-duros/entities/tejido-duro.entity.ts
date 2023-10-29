import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TejidoDuro {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  MaxilarSuperior: string;

  @Column({ type: 'varchar', length: 255 })
  MaxilarInferior: string;

  @Column({ type: 'varchar', length: 255 })
  Numero: number;

  @Column({ type: 'varchar', length: 255 })
  Color: string;

  @Column({ type: 'varchar', length: 255 })
  Forma: string;

  @Column({ type: 'varchar', length: 255 })
  Tamano: string;

  @Column({ type: 'varchar', length: 255 })
  Diastemas: string;

  @Column({ type: 'varchar', length: 255 })
  ZonasEdentulasyRebordeAlveolar: string;

  @Column({ type: 'varchar', length: 255 })
  AlteracionDePosiciones: string;

  @Column({ type: 'varchar', length: 255 })
  FacetaDeDesgaste: string;

  @Column({ type: 'varchar', length: 255 })
  LineaMedia: string;

  @Column({ type: 'varchar', length: 255 })
  Otro: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.MaxilarSuperior = this.MaxilarSuperior?.trim().toLowerCase();
    this.MaxilarInferior = this.MaxilarInferior?.trim().toLowerCase();
    this.Color = this.Color?.trim().toLowerCase();
    this.Forma = this.Forma?.trim().toLowerCase();
    this.Tamano = this.Tamano?.trim().toLowerCase();
    this.Diastemas = this.Diastemas?.trim().toLowerCase();
    this.ZonasEdentulasyRebordeAlveolar = this.ZonasEdentulasyRebordeAlveolar?.trim().toLowerCase();
    this.AlteracionDePosiciones = this.AlteracionDePosiciones?.trim().toLowerCase();
    this.FacetaDeDesgaste = this.FacetaDeDesgaste?.trim().toLowerCase();
    this.LineaMedia = this.LineaMedia?.trim().toLowerCase();
    this.Otro = this.Otro?.trim().toLowerCase();
  }

  @BeforeRemove()
  handleDelete() {
    this.activo = false;
  }
}
