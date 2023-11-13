import { CreateManifestacionEndodonciaDto } from './dto/create-manifestacion-endodoncia.dto';
import { UpdateManifestacionEndodonciaDto } from './dto/update-manifestacion-endodoncia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ManifestacionEndodoncia } from './entities/manifestacion-endodoncia.entity';


@Injectable()
export class ManifestacionEndodonciaService {
  constructor(
    @InjectRepository(ManifestacionEndodoncia)
    private readonly dbManifestacion: Repository<ManifestacionEndodoncia>,

    // private  dbEndodoncia: EndodonciaService,
    // private  dbManifestacionDolor: ManifestacionDolorService,
  ) { }

  async create(EndodonciaId: number, ManifestacionDolorId: number, createManifestacionEndodonciaDto: CreateManifestacionEndodonciaDto) {
    try {
      // const Endodoncia = await this.dbEndodoncia.findOne(EndodonciaId);
      // const ManifestacionDolor = await this.dbManifestacionDolor.findOne(ManifestacionDolorId);
      const ManifestacionEndodoncia = this.dbManifestacion.create(createManifestacionEndodonciaDto);
      // ManifestacionEndodoncia.Endodoncia = Endodoncia;
      // ManifestacionEndodoncia.ManifestacionDolor = ManifestacionDolor;
      return await this.dbManifestacion.save(ManifestacionEndodoncia);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbManifestacion.find({ relations: ['Endodoncia', 'ManifestacionDolor'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    let manifestacionEndodoncia: ManifestacionEndodoncia;
    try {
      if (isNaN(+id)) {
        manifestacionEndodoncia = await this.dbManifestacion.findOneBy({ ManifestacionEndodonciaId: +id });
      }

      if (!manifestacionEndodoncia) {
        throw new NotFoundException(
          `no existe una ManifestacionEndodoncia  con el id ${id} en la base de datos`,
        );
      }

      return manifestacionEndodoncia;
    } catch (error) {
      throw error;
    }
  }

  async update(ManifestacionEndodonciaId: number, updateManifestacionEndodonciaDto: UpdateManifestacionEndodonciaDto) {
    try {
      const manifestacionEndodoncia = await this.dbManifestacion.preload({
        ManifestacionEndodonciaId,
        ...updateManifestacionEndodonciaDto,
      });
      if (!manifestacionEndodoncia) {
        throw new BadRequestException('No existe el docente que desea actualizar');
      }
      return await this.dbManifestacion.save(manifestacionEndodoncia);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} manifestacionEndodoncia`;
  }
}
