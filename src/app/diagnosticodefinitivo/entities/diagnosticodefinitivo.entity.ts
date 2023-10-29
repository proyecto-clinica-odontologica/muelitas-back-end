import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { Column, PrimaryGeneratedColumn, Entity, DeleteDateColumn, BeforeInsert, BeforeUpdate, ManyToOne} from 'typeorm';

@Entity()
export class Diagnosticodefinitivo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Diagnostico: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    FechaRegistro: Date;

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt?: Date;
  
    @Column({ type: 'boolean', default: true, nullable: true })
    activo?: boolean;

    @ManyToOne(() => Paciente, (paciente) => paciente.diagnosticodefinitivo)
    paciente: Paciente;

    @BeforeInsert()
    @BeforeUpdate()
    limpiarCampos() {
        this.Diagnostico = this.Diagnostico?.trim().toLowerCase();
    }
}

