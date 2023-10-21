import { Cita } from "src/cita/entities/cita.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seguimiento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 255})
    Nombre: string;

    @ManyToOne(()=> Cita, (cita)=> cita.seguimientos)
    cita: Cita;
}
