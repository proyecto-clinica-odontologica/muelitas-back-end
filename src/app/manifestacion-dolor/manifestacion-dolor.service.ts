import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManifestacionDolorDto } from './dto/create-manifestacion-dolor.dto';
import { UpdateManifestacionDolorDto } from './dto/update-manifestacion-dolor.dto';
import { ManifestacionDolor } from './entities/manifestacion-dolor.entity';

@Injectable()
export class ManifestacionDolorService {
  constructor(
    @InjectRepository(ManifestacionDolor)
    private readonly tblManifestacionDolor: Repository<ManifestacionDolor>,
  ) {}

  async create(createManifestacionDolorDto: CreateManifestacionDolorDto) {
    try {
      const manifestarDolor = this.tblManifestacionDolor.create(createManifestacionDolorDto);
      await this.tblManifestacionDolor.save(manifestarDolor);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const manifestacionesDolores = await this.tblManifestacionDolor.find();
      return this.camposVisibles(manifestacionesDolores);
    } catch (error) {
      throw error;
    }
  }

  async findAllDelete() {
    try {
      const manifestacionesDolores = await this.tblManifestacionDolor.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(manifestacionesDolores);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const manifestacionDolor = await this.tblManifestacionDolor.findOne({
        where: { id },
        withDeleted: checkDeleted,
      });

      if (!manifestacionDolor) throw { message: 'No se encontró la manifestación del dolor' };

      if (manifestacionDolor.deletedAt && !checkDeleted) {
        throw new BadRequestException('La manifestación del dolor fue eliminado anteriormente');
      }

      if (!manifestacionDolor.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar una manifestacion que no ha sido eliminada');
      }

      return this.omitirCampos(manifestacionDolor);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateManifestacionDolorDto: UpdateManifestacionDolorDto) {
    try {
      const manifestacion = await this.tblManifestacionDolor.preload({
        id,
        ...updateManifestacionDolorDto,
      });

      if (!manifestacion) {
        throw new NotFoundException('No se encontró la manifestación del dolor');
      }

      await this.tblManifestacionDolor.save(manifestacion);

      return this.omitirCampos(manifestacion);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const manifestacion = await this.findOneById(id);
      await this.tblManifestacionDolor.update(manifestacion.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'Se eliminó la manifestación del dolor' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const manifestacion = await this.findOneById(id, true);
      await this.tblManifestacionDolor.update(manifestacion.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'Se restauró la manifestación del dolor' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(manifestacionDolor: ManifestacionDolor) {
    delete manifestacionDolor.activo;
    delete manifestacionDolor.deletedAt;

    return manifestacionDolor;
  }

  private camposVisibles(manifestacionesDolores: ManifestacionDolor[]) {
    return manifestacionesDolores.map((manifestacionDolor) => this.omitirCampos(manifestacionDolor));
  }
}
