import { Cita } from "src/cita/entities/cita.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tratamiento {
    @PrimaryGeneratedColumn()
    tratamiento_id: number;
    @Column()
    tratamiento_nombre: string;

    @OneToMany(()=> Cita, (cita) => cita.tratamiento)
    citas: Cita[];
}
