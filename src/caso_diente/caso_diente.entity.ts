import { Diente } from "src/dientes/diente.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Caso_Diente{

    @PrimaryGeneratedColumn()
    idCasoDiente: number;

    @Column()
    Nombre: string;

    @Column()
    Foto: string;
    
    @Column()
    idDiente: number;

    @ManyToOne(() => Diente, diente=> diente.caso_diente) // Muchos a Uno
    diente: Diente;

}