import { ManifestacionEndodoncia } from 'src/manifestacion-endodoncia/entities/manifestacion-endodoncia.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


export class ManifestacionDolor {
    @PrimaryGeneratedColumn('increment')
    ManifestacionDolorId: number;

    @Column({ type: 'varchar', nullable: false })
    Nombre: string;

    // @OneToMany(() => ManifestacionEndodoncia, (manifestacionEndodoncia) => manifestacionEndodoncia.manifestacionDolor)
    // manifestacionEndodoncia: ManifestacionEndodoncia[];
}
