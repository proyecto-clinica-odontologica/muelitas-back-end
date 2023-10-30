import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Epicrisis {
    @PrimaryGeneratedColumn('increment')
    IdEpicrisis: number;

    @Column({ type: 'varchar' , nullable: false})
    Contenido: string;

    @Column({ type: 'timestamp', nullable: false })
    FechaRegistro: Date;


    // @ManyToOne(() => Paciente, (paciente) => paciente.epicrisis, { onDelete: 'CASCADE' })
    // paciente: Paciente;

}
