import { Paciente } from 'muelitas-back-end/dist/paciente/entities/paciente.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Time } from 'typeorm';
@Entity()

export class Interpretacion {
    @PrimaryGeneratedColumn('increment')
    InterpretacionId: number;

    @Column({ type: 'varchar', nullable: false })
    RadiografiaPanoramica: string;

    @Column({ type: 'varchar', nullable: false })
    HemogramaCompleto: string;

    @Column({ type: 'varchar', nullable: false })
    TiempoSangrado: string;

    @Column({ type: 'varchar', nullable: false })
    TiempoCuagulacion: string;

    @Column({ type: 'timestamp', nullable: false })
    FechaRegistro: Date;


    // @ManyToOne(() => Paciente, (paciente) => paciente.interpretacion, { onDelete: 'CASCADE' })
    // paciente: Paciente;


}
