import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class SubCasoClinico {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 60 })
    Nombre: string;

    @Column({ type: 'boolean', default: true, nullable: true })
    activo?: boolean;

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt?: Date;
  
    @BeforeInsert()
    @BeforeUpdate()
    limpiarCampos() {
      this.Nombre = this.Nombre?.toLowerCase();
    }
  }