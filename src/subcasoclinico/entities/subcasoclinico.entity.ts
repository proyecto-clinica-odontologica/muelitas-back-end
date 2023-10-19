import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany
  } from 'typeorm';
  import { CasoClinico } from 'src/casosclinicos/entities/casoclinico.entity'; 
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

    @OneToMany(() => CasoClinico, (casoclinico) => casoclinico.id)
    casoClinico: CasoClinico[];
  
    @BeforeInsert()
    @BeforeUpdate()
    limpiarCampos() {
      this.Nombre = this.Nombre?.toLowerCase();
    }
  }