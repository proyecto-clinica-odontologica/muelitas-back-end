import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'Tejido_Duro'})

export class TejidoDuro{

    @PrimaryGeneratedColumn()
    idTejidoDuro: number;

    @Column()
    MaxilarSuperior: string;

    @Column()
    MaxilarInferior: string;

    @Column()
    Numero: string;

    @Column()
    Color: string;

    @Column()
    Forma: string;

    @Column()
    Tamaño: string;

    @Column()
    Diastesma: string;

    @Column()
    ZonasEdentulasyRebordeAlveolar: string;

    @Column()
    AlteracionesdePosiciones: string;

    @Column()
    FacetadeDesgaste: string;

    @Column()
    LineaMedia: string;

    @Column()
    Otro: string;

}
