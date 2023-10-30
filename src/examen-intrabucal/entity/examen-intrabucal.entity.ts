import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Examen_Intrabucal'})
export class ExamenIntrabucal{

    @PrimaryGeneratedColumn()
    idExamenIntrabucal: number;

    @Column()
    LabiosyComisuraLabial: string;

    @Column()
    PaladarDurosyBlando: string;
    
    @Column()
    Carrillos: string;

    @Column()
    PisoDeBoca: string;

    @Column()
    Lengua: string;

    @Column()
    Orofaringe: string;

    @Column()
    Frenillos: string;

    @Column()
    Saliva: string;

}