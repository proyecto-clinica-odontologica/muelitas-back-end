import { Caso_Diente } from 'src/caso_diente/caso_diente.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'dientes'})  

export class Diente{
    // '@Column()' Esto transforma en columnas en nuestra tabla de Usuarios con sus respectivas carecteristicas
    @PrimaryGeneratedColumn()      
    idDiente: number;

    @Column({unique: true})            // '{unique: true}' significa que es un unico dato
    nombre: string;

    @Column({unique: true})            // '{unique: true}' significa que es un unico dato
    ubicacion: string;

    @Column()
    tipo: number;

    @Column()
    raiz: number;

    @Column()
    lado: number;

    @Column()
    posicion: number;

    @Column()
    estado: boolean;

    @OneToMany(() => Caso_Diente, caso_diente => caso_diente.diente) // Uno a Uno
    caso_diente: Caso_Diente[];
}