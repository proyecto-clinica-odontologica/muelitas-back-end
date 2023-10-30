import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class PlanyCronogramaTratamiento {

    @PrimaryGeneratedColumn('increment')
    IdPlanTratamiento: number;

    @Column({ type: 'varchar', nullable: false })
    Resumen: string;

    @Column({ type: 'varchar', nullable: false })
    Especificaciones: string;

    @Column({ type: 'varchar', nullable: false })
    Observaciones: string;

    // @ManyToOne(() => Paciente, (paciente) => paciente.planyCronogramaTratamiento, { onDelete: 'CASCADE' })
    // paciente: Paciente;
}
