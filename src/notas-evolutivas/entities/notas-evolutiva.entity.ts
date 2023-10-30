import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


export class NotasEvolutiva {

    @PrimaryGeneratedColumn('increment')
    IdNotasEvolutivas: number;

    @Column({ type: 'timestamp'  , nullable: false  })
    Fecha: Date;

    @Column({ type: 'varchar' , nullable: false  })
    Tratamiento: string;

    @Column({ type: 'varchar' , nullable: false  })
    Firma: string;

    // @ManyToOne(() => Paciente, (paciente) => paciente.notasEvolutiva, { onDelete: 'CASCADE' })
    // paciente: Paciente;

}
