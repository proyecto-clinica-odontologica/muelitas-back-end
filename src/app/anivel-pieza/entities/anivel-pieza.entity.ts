import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnivelPieza {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  EnciaNormal: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaFaltaoAusencia: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaInconsistencia: string;

  @Column({ type: 'varchar', length: 255 })
  ColorNormal: string;

  @Column({ type: 'varchar', length: 255 })
  ColorEritemosa: string;

  @Column({ type: 'varchar', length: 255 })
  ColorPalido: string;

  @Column({ type: 'varchar', length: 255 })
  TexturaNormal: string;

  @Column({ type: 'varchar', length: 255 })
  TexturaLisa: string;

  @Column({ type: 'varchar', length: 255 })
  TexturaRugosa: string;

  @Column({ type: 'varchar', length: 255 })
  ConsistenaciaNormal: string;

  @Column({ type: 'varchar', length: 255 })
  ConsistenciaEdematosa: string;

  @Column({ type: 'varchar', length: 255 })
  ConsistenciaFibrosa: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaPapilarNormal: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaPapilarAplanada: string;

  @Column({ type: 'varchar', length: 255 })
  EnciaPapilarCrateriforme: string;

  @Column({ type: 'varchar', length: 255 })
  Encia: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  limpiarCampos() {
    this.EnciaNormal = this.EnciaNormal?.trim().toLowerCase();
    this.EnciaFaltaoAusencia = this.EnciaFaltaoAusencia?.trim().toLowerCase();
    this.EnciaInconsistencia = this.EnciaInconsistencia?.trim().toLowerCase();
    this.ColorNormal = this.ColorNormal?.trim().toLowerCase();
    this.ColorEritemosa = this.ColorEritemosa?.trim().toLowerCase();
    this.ColorPalido = this.ColorPalido?.trim().toLowerCase();
    this.TexturaNormal = this.TexturaNormal?.trim().toLowerCase();
    this.TexturaLisa = this.TexturaLisa?.trim().toLowerCase();
    this.TexturaRugosa = this.TexturaRugosa?.trim().toLowerCase();
    this.ConsistenaciaNormal = this.ConsistenaciaNormal?.trim().toLowerCase();
    this.ConsistenciaEdematosa = this.ConsistenciaEdematosa?.trim().toLowerCase();
    this.ConsistenciaFibrosa = this.ConsistenciaFibrosa?.trim().toLowerCase();
    this.EnciaPapilarNormal = this.EnciaPapilarNormal?.trim().toLowerCase();
    this.EnciaPapilarAplanada = this.EnciaPapilarAplanada?.trim().toLowerCase();
    this.EnciaPapilarCrateriforme = this.EnciaPapilarCrateriforme?.trim().toLowerCase();
    this.Encia = this.Encia?.trim().toLowerCase();
  }

  @BeforeRemove()
  handleDelete() {
    this.activo = false;
  }
}
