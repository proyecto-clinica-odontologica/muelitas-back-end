import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endodoncia } from '../endodoncia/entities/endodoncia.entity';
import { CreateRadiografiaEndodonciaDto } from './dto/create-radiografia-endodoncia.dto';
import { UpdateRadiografiaEndodonciaDto } from './dto/update-radiografia-endodoncia.dto';
import { RadiografiaEndodoncia } from './entities/radiografia-endodoncia.entity';

@Injectable()
export class RadiografiaEndodonciaService {
  constructor(
    @InjectRepository(RadiografiaEndodoncia)
    private readonly tblRadiografiaEndodoncia: Repository<RadiografiaEndodoncia>,

    @InjectRepository(Endodoncia)
    private readonly tblEndodoncia: Repository<Endodoncia>,
  ) {}

  async registrarRadiografiaEndodoncia(createRadiografiaEndodonciaDto: CreateRadiografiaEndodonciaDto) {
    try {
      const endodoncia = await this.tblEndodoncia.findOne({
        where: { id: createRadiografiaEndodonciaDto.EndodonciaId },
      });

      if (!endodoncia) {
        throw new NotFoundException('No existe la endodoncia');
      }

      const radiografiaEndodoncia = this.tblRadiografiaEndodoncia.create({
        ...createRadiografiaEndodonciaDto,
        endodoncia: endodoncia,
      });

      await this.tblRadiografiaEndodoncia.save(radiografiaEndodoncia);

      return this.omitirCampos(radiografiaEndodoncia);
    } catch (error) {
      throw error;
    }
  }

  async obtenerRadiografiasEndodoncias() {
    try {
      const endodoncias = await this.tblRadiografiaEndodoncia.find({
        relations: ['endodoncia'],
      });

      return this.camposVisibles(endodoncias);
    } catch (error) {
      throw error;
    }
  }

  async obtenerRadiografiasEndodonciasEliminadas() {
    try {
      const endodoncias = await this.tblRadiografiaEndodoncia.find({
        where: { activo: false },
        withDeleted: true,
        relations: ['endodoncia'],
      });

      return this.camposVisibles(endodoncias);
    } catch (error) {
      throw error;
    }
  }

  async buscarRadiografiaEndodonciaPorId(id: number, checkDeleted = true) {
    try {
      const radiografiasEndodoncias = await this.tblRadiografiaEndodoncia.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!radiografiasEndodoncias) {
        throw new NotFoundException('No existe la endodoncia solicitada');
      }

      if (radiografiasEndodoncias.deletedAt && !checkDeleted) {
        throw new BadRequestException('La endodoncia fue eliminado anteriormente');
      }

      if (!radiografiasEndodoncias.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar una endodoncia que no ha sido eliminado');
      }

      return this.omitirCampos(radiografiasEndodoncias);
    } catch (error) {
      throw error;
    }
  }

  async actualizarRadiografiaEndodoncia(id: number, updateRadiografiaEndodonciaDto: UpdateRadiografiaEndodonciaDto) {
    try {
      const radiografiaEndodoncia = await this.tblRadiografiaEndodoncia.preload({
        id,
        ...updateRadiografiaEndodonciaDto,
      });

      if (!radiografiaEndodoncia) {
        throw new NotFoundException('No existe la endodoncia');
      }

      await this.tblRadiografiaEndodoncia.save(radiografiaEndodoncia);

      return this.omitirCampos(radiografiaEndodoncia);
    } catch (error) {
      throw error;
    }
  }

  async eliminarRadiografiaEndodoncia(id: number) {
    try {
      const radiografiaEndodoncia = await this.buscarRadiografiaEndodonciaPorId(id);
      await this.tblRadiografiaEndodoncia.update(radiografiaEndodoncia.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'Se elimino la endodoncia correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarRadiografiaEndodoncia(id: number) {
    try {
      const radiografiaEndodoncia = await this.buscarRadiografiaEndodonciaPorId(id, true);
      await this.tblRadiografiaEndodoncia.update(radiografiaEndodoncia.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'Se restauro la endodoncia correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(radiografiaEndodoncia: RadiografiaEndodoncia) {
    delete radiografiaEndodoncia?.deletedAt;
    delete radiografiaEndodoncia?.activo;
    delete radiografiaEndodoncia?.endodoncia?.activo;
    delete radiografiaEndodoncia?.endodoncia?.deletedAt;

    return radiografiaEndodoncia;
  }

  private camposVisibles(radiografiasEndodoncias: RadiografiaEndodoncia[]) {
    return radiografiasEndodoncias.map((radiografiaEndodoncia) => this.omitirCampos(radiografiaEndodoncia));
  }
}
