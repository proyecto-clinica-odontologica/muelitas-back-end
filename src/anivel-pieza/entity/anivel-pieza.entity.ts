import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'anivel_pieza'})
export class AnivelPieza{

    @PrimaryGeneratedColumn()
    idAnivelPieza: number;

    @Column()
    EnciaNormal: string;

    @Column()
    EnciaFaltaoAusencia: string;

    @Column()
    EnciaInconcistencia: string;

    @Column()
    ColorNormal: string;

    @Column()
    ColorEntematosa: string;

    @Column()
    ColorPalido: string;

    @Column()
    TexturaNormal: string;

    @Column()
    TexturaLIsa: string;

    @Column()
    TexturaRugosa: string;

    @Column()
    ConsistenciaNormal: string;

    @Column()
    ConsistenciaEdematosa: string;

    @Column()
    ConsistenciaFibrosa: string;

    @Column()
    EnciaPapilarNormal: string;

    @Column()
    EnciaPapilarAplanda: string;

    @Column()
    EnciaPapilarCrateniforme: string;

    @Column()
    Encia: string;

}