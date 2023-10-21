import { Cita } from "src/cita/entities/cita.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tratamiento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 255})
    Nombre: string;

    @OneToMany(()=> Cita, (citas) => citas.tratamiento)
    citas: Cita[];
}
