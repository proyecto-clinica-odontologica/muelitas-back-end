import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateManifestacionDolorDto } from './dto/create-manifestacion-dolor.dto';
import { UpdateManifestacionDolorDto } from './dto/update-manifestacion-dolor.dto';
import { ManifestacionDolor } from './entities/manifestacion-dolor.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ManifestacionDolorService {
  constructor(
    @InjectRepository(ManifestacionDolor)
    private readonly dbManifestacionDolor: Repository<ManifestacionDolor>,
  ) { }


  async create(createManifestacionDolorDto: CreateManifestacionDolorDto) {
    try {
      const manifestacionDolor = this.dbManifestacionDolor.create(createManifestacionDolorDto);
      await this.dbManifestacionDolor.save(manifestacionDolor);
      return manifestacionDolor;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El sub caso clinico ya existe');
      }
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbManifestacionDolor.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    let manifestacionDolor: ManifestacionDolor;
    try {
      if (isNaN(+id)) {
        manifestacionDolor = await this.dbManifestacionDolor.findOneBy({ ManifestacionDolorId: +id });
      }

      if (!manifestacionDolor) {
        throw new NotFoundException(
          `no existe una endodoncia con el id ${id} en la base de datos`,
        );
      }

      return manifestacionDolor;
    } catch (error) {
      throw error;
    }
  }

  async update(ManifestacionDolorId: number, updateManifestacionDolorDto: UpdateManifestacionDolorDto) {
    try {
      const manifestacionDolor = await this.dbManifestacionDolor.preload({
        ManifestacionDolorId,
        ...updateManifestacionDolorDto,
      });
      if (!manifestacionDolor) {
        throw new BadRequestException('No existe el manifestacionDolor que desea actualizar');
      }
      return await this.dbManifestacionDolor.save(manifestacionDolor);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const manifestacionDolor = await this.findOne(id);
      await this.dbManifestacionDolor.remove(manifestacionDolor);
      return {
        message: `la manifestacionDolor con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
