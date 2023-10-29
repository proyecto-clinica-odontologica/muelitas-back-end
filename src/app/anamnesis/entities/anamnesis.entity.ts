import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { Column, PrimaryGeneratedColumn, Entity, DeleteDateColumn, ManyToOne, BeforeInsert, BeforeUpdate} from 'typeorm';

@Entity()
export class Anamnesis{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Contenido: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    FechaRegistro: Date;

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt?: Date;
  
    @Column({ type: 'boolean', default: true, nullable: true })
    activo?: boolean;

    @ManyToOne(() => Paciente, (paciente) => paciente.anamnesis)
    paciente: Paciente;

    @BeforeInsert()
    @BeforeUpdate()
    limpiarCampos() {
        this.Contenido = this.Contenido?.trim().toLowerCase();
    }
}