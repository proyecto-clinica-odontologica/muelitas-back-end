// import { Odontograma } from '../../odontograma/entities/odontograma.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { HistoriaClinica } from '../../HistoriaClinica/dto/historia-clinica.entity';
// import { Cita } from '../../cita/entities/cita.entity';

@Entity(Endodoncia)

export class Endodoncia {

    @PrimaryGeneratedColumn('increment')
    EndodonciaId: number;

    @Column({ type: 'varchar', nullable: false })
    Fecha: string;

    @Column({ type: 'varchar', nullable: false })
    MotivoConsulta: string;

    @Column({ type: 'varchar', nullable: false })
    PiezaDental: string;

    @Column({ type: 'varchar', nullable: false })
    ECPercucion: string;

    @Column({ type: 'varchar', nullable: false })
    ECCavidad: string;

    @Column({ type: 'varchar', nullable: false })
    ECCambioColor: string;

    @Column({ type: 'varchar', nullable: false })
    ECTejidosBlandos: string;

    @Column({ type: 'varchar', nullable: false })
    ECTermoreaccion: string;

    @Column({ type: 'varchar', nullable: false })
    ECElectroReaccion: string;

    @Column({ type: 'varchar', nullable: false })
    ERCavidad: string;

    @Column({ type: 'varchar', nullable: false })
    ERTratamientoPrevio: string;

    @Column({ type: 'varchar', nullable: false })
    ERPeriododyro: string;

    @Column({ type: 'varchar', nullable: false })
    ERLesionesPeriauriculares: string;

    @Column({ type: 'varchar', nullable: false })
    ERNumerodeConductos: string;

    @Column({ type: 'varchar', nullable: false })
    ERPresipitacionesCalcitas: string;

    @Column({ type: 'varchar', nullable: false })
    STAAnestecia: string;

    @Column({ type: 'varchar', nullable: false })
    STAAislamientoAbsoluto: string;

    @Column({ type: 'varchar', nullable: false })
    FechaRegistro: string;


    // @OneToMany(() => RadiografiaEndodoncia, (radiografiaEndodoncia) => radiografiaEndodoncia.Endodoncia)
    // radiografiaEndodoncias: RadiografiaEndodoncia[];
    // @OneToMany(() => OpturaciondeConductos, (opturaciondeConductos) => opturaciondeConductos.Endodoncia)
    // opturaciondeConductoss: OpturaciondeConductos[];
    // @OneToMany(() => ManifestacionEndodoncia, (manifestacionEndodoncia) => manifestacionEndodoncia.Endodoncia)
    // manifestacionEndodoncias: ManifestacionEndodoncia[];
    // @OneToMany(() => PreparacionQuimica, (preparacionQuimica) => preparacionQuimica.Endodoncia)
    // preparacionQuimicas: PreparacionQuimica[];


}


