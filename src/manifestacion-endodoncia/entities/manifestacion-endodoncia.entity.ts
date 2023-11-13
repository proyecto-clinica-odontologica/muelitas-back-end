import { ManifestacionDolor } from 'src/manifestacion-dolor/entities/manifestacion-dolor.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


export class ManifestacionEndodoncia {

    @PrimaryGeneratedColumn('increment')
    ManifestacionEndodonciaId: number;


    
    // @ManyToOne(() => Endodoncia, (endodoncia) => endodoncia.manifestacionEndodoncia)
    // endodoncia: Endodoncia;

    
    // @ManyToOne(() => ManifestacionDolor, (manifestacionDolor) => manifestacionDolor.manifestacionEndodoncia)
    // manifestacionDolor: ManifestacionDolor;
}
