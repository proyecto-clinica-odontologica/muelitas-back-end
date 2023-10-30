import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ExamenEstomatologico')
export class ExamenEstomatologico {
    @PrimaryGeneratedColumn('increment')
    IdExamenEstomatologico: number;

    @Column({ type: 'varchar', nullable: false })
    Facie: string;
    @Column({ type: 'varchar', nullable: false })
    Craneo: string;
    @Column({ type: 'varchar', nullable: false })
    Cara: string;
    @Column({ type: 'varchar', nullable: false })
    SimetriaTresTercios: string;
    @Column({ type: 'varchar', nullable: false })
    SimetriaBilateral: string;
    @Column({ type: 'varchar', nullable: false })
    SimetriaPerfil: string;
    @Column({ type: 'varchar', nullable: false })
    ATMtrayectoriaaperturaycierre: string;
    @Column({ type: 'varchar', nullable: false })
    ATMfluidosdelaATM: string;
    @Column({ type: 'varchar', nullable: false })
    ATMpalpitacion: string;
    @Column({ type: 'varchar', nullable: false })
    ATMgradodeapertura: string;
    @Column({ type: 'varchar', nullable: false })
    Ganglios: string;

    // @ManyToOne(() => Paciente, (paciente) => paciente.ExamenEstomatologico, { onDelete: 'CASCADE' })
    // paciente: Paciente;

    // @OneToMany(() => AnivelPieza, (anivelPieza) => anivelPieza.ExamenEstomatologico)
    // anivelPieza: AnivelPieza[];

    // @OneToMany(() => TejidosDuros, (tejidosDuros) => tejidosDuros.ExamenEstomatologico)
    // tejidosDuros: TejidosDuros[];

    // @OneToMany(() => ExamenIntrabucal, (examenIntrabucal) => examenIntrabucal.ExamenEstomatologico)
    // examenIntrabucal: ExamenIntrabucal[];

    // @OneToMany(() => Dolor, (dolor) => dolor.ExamenEstomatologico)
    // dolor: Dolor[];

    // @OneToMany(() => Oclusion, (oclusion) => oclusion.ExamenEstomatologico)
    // oclusion: Oclusion[];
}
