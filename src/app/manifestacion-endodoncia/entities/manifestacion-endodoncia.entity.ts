import { Endodoncia } from 'src/app/endodoncia/entities/endodoncia.entity';
import { ManifestacionDolor } from 'src/app/manifestacion-dolor/entities/manifestacion-dolor.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ManifestacionEndodoncia {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ManifestacionDolor, (manifestacionDolor) => manifestacionDolor.manifestacionesEndodoncias)
  manifestacionDolor: ManifestacionDolor;

  @ManyToOne(() => Endodoncia, (endodoncia) => endodoncia.manifestacionesEndodoncias)
  endodoncia: Endodoncia;
}
