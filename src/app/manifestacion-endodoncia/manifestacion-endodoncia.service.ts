import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endodoncia } from '../endodoncia/entities/endodoncia.entity';
import { ManifestacionDolor } from '../manifestacion-dolor/entities/manifestacion-dolor.entity';
import { CreateManifestacionEndodonciaDto } from './dto/create-manifestacion-endodoncia.dto';
import { ManifestacionEndodoncia } from './entities/manifestacion-endodoncia.entity';

@Injectable()
export class ManifestacionEndodonciaService {
  constructor(
    @InjectRepository(ManifestacionEndodoncia)
    private readonly tblManifestacionEndodoncia: Repository<ManifestacionEndodoncia>,

    @InjectRepository(Endodoncia)
    private readonly tblEndodoncia: Repository<Endodoncia>,

    @InjectRepository(ManifestacionDolor)
    private readonly tblManifestacionDolor: Repository<ManifestacionDolor>,
  ) {}

  async create(createManifestacionEndodonciaDto: CreateManifestacionEndodonciaDto) {
    try {
      const endodoncia = await this.tblEndodoncia.findOne({
        where: { id: createManifestacionEndodonciaDto.EndodonciaId },
      });

      const manifestacionDolor = await this.tblManifestacionDolor.findOne({
        where: { id: createManifestacionEndodonciaDto.ManifestacionDolorId },
      });

      const manifestacionEndodoncia = this.tblManifestacionEndodoncia.create({
        ...createManifestacionEndodonciaDto,
        endodoncia,
        manifestacionDolor,
      });

      await this.tblManifestacionEndodoncia.save(manifestacionEndodoncia);

      return manifestacionEndodoncia;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      await this.tblManifestacionEndodoncia.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const manifestacionEndodoncia = await this.tblManifestacionEndodoncia.findOne({
        where: { id },
      });
      return manifestacionEndodoncia;
    } catch (error) {
      throw error;
    }
  }
}
