
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Odontograma {
    @PrimaryGeneratedColumn('increment')
    IdOdontograma: number;

    @Column({ type: 'varchar' })
    Nombre: string;

    @Column({ type: 'varchar' })
    Estado: string;

    @Column({ type: 'int', nullable: false  })
    Numero: number

    // @ManyToOne(() => Paciente, (Paciente) => Paciente.idPaciente, { onDelete: 'CASCADE' })
    // paciente: Paciente;

    // @OneToMany(() => Mapeo, (mapeo) => mapeo.IdOdontograma)
    // mapeo: Mapeo[];


}