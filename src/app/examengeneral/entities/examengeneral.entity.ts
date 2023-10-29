import { Paciente } from 'src/app/paciente/entities/paciente.entity';
import { Column, PrimaryGeneratedColumn, Entity, DeleteDateColumn, BeforeInsert, BeforeUpdate, ManyToOne} from 'typeorm';
@Entity()
export class ExamenGeneral{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    peso: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    talla: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    IndiceMasaCorporal: number;

    @Column()
    piel: string;

    @Column()
    AnexosCabello: string;

    @Column()
    AnexosUnias: string;

    @Column({ nullable: true })
    presionArterial: string;

    @Column()
    frecuenciaRespiratoria: number;

    @Column()
    pulso: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    temperatura: number;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    FechaRegistro: Date;

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt?: Date;
  
    @Column({ type: 'boolean', default: true, nullable: true })
    activo?: boolean;

    @ManyToOne(() => Paciente, (paciente) => paciente.diagnosticopresuntivo)
    paciente: Paciente;

    @BeforeInsert()
    @BeforeUpdate()
    limpiarCampos() {
        this.piel = this.piel?.trim().toLowerCase();
        this.AnexosCabello = this.AnexosCabello?.trim().toLowerCase();
        this.AnexosUnias = this.AnexosUnias?.trim().toLowerCase();
        this.presionArterial = this.presionArterial?.trim().toLowerCase();
    }
}