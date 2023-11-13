// import { Odontograma } from '../../odontograma/entities/odontograma.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { HistoriaClinica } from '../../HistoriaClinica/dto/historia-clinica.entity';
// import { Cita } from '../../cita/entities/cita.entity';


@Entity()
export class RadiografiaEndodoncia {

    @PrimaryGeneratedColumn('increment')
    RadiografiaEndodonciaId: number;

    @Column({ type: 'varchar', nullable: false })
    Fecha: string;

    @Column({ type: 'varchar', nullable: false })
    Foto: string;

    @Column({ type: 'varchar', nullable: false })
    Interpretacion: string;

    @Column({ type: 'varchar', nullable: false })
    FechaRegistro: string

    // @ManyToOne(() => Endodoncia, (endodoncia) => endodoncia.radiografiaEndodoncia)
    // endodoncia: Endodoncia;
}
