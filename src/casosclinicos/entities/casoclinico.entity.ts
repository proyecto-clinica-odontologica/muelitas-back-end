import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class CasoClinico {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 60 })
    Nombre: string;

    @Column({ type: 'boolean', default: true, nullable: true })
    activo?: boolean;
  
    @BeforeInsert()
    @BeforeUpdate()
    limpiarCampos() {
      this.Nombre = this.Nombre?.toLowerCase();
    }
  }