import { Cita } from "src/cita/entities/cita.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seguimiento {
    @PrimaryGeneratedColumn()
    seguimiento_id: number;
    @Column()
    seguimiento_nombre: string;

    @ManyToOne(()=> Cita, (cita)=> cita.seguimientos, {
        eager: true
    })
    @JoinColumn({name: 'cita_id'})
    cita: Cita;
}
