import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTejidosDuroDto } from './dto/create-tejidos-duro.dto';
import { UpdateTejidosDuroDto } from './dto/update-tejidos-duro.dto';
import { TejidoDuro } from './entities/tejido-duro.entity';

@Injectable()
export class TejidosDurosService {
  constructor(
    @InjectRepository(TejidoDuro)
    private readonly tblTejidoDuro: Repository<TejidoDuro>,
  ) {}

  async crearTejidoDuro(createTejidosDuroDto: CreateTejidosDuroDto) {
    try {
      const tejido = this.tblTejidoDuro.create(createTejidosDuroDto);
      await this.tblTejidoDuro.save(tejido);

      return this.omitirCampos(tejido);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el tejido duro');
    }
  }

  async obtenerTejidosDuros() {
    try {
      return await this.tblTejidoDuro.find({
        where: { activo: true },
        select: [
          'id',
          'MaxilarSuperior',
          'MaxilarInferior',
          'Numero',
          'Color',
          'Forma',
          'Tamano',
          'Diastemas',
          'ZonasEdentulasyRebordeAlveolar',
          'AlteracionDePosiciones',
          'FacetaDeDesgaste',
          'LineaMedia',
          'Otro',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerTejidosDurosEliminados() {
    try {
      return await this.tblTejidoDuro.find({
        where: { activo: false },
        select: [
          'id',
          'MaxilarSuperior',
          'MaxilarInferior',
          'Numero',
          'Color',
          'Forma',
          'Tamano',
          'Diastemas',
          'ZonasEdentulasyRebordeAlveolar',
          'AlteracionDePosiciones',
          'FacetaDeDesgaste',
          'LineaMedia',
          'Otro',
        ],
        withDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarTejidoDuroPorId(id: number, checkDeleted: boolean = false) {
    try {
      const tejido = await this.tblTejidoDuro.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!tejido) {
        throw new NotFoundException('No se encontró el tejido duro');
      }

      if (!checkDeleted && tejido.deletedAt) {
        throw new NotFoundException('El tejido duro ya fue eliminado');
      }

      if (checkDeleted && !tejido.deletedAt) {
        throw new NotFoundException('El tejido duro no está eliminado');
      }

      return this.omitirCampos(tejido);
    } catch (error) {
      throw error;
    }
  }

  async actualizarTejidoDuro(id: number, updateTejidosDuroDto: UpdateTejidosDuroDto) {
    try {
      const tejido = await this.tblTejidoDuro.preload({
        id,
        ...updateTejidosDuroDto,
      });

      if (!tejido) {
        throw new NotFoundException('No se encontró el tejido duro');
      }

      await this.tblTejidoDuro.save(tejido);

      return this.omitirCampos(tejido);
    } catch (error) {
      throw error;
    }
  }

  async eliminarTejidoDuro(id: number) {
    try {
      const tejido = await this.buscarTejidoDuroPorId(id);
      await this.tblTejidoDuro.update(tejido.id, { activo: false, deletedAt: new Date() });

      return {
        message: `Tejido duro eliminado correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarTejidoDuro(id: number) {
    try {
      const tejido = await this.buscarTejidoDuroPorId(id, true);
      await this.tblTejidoDuro.update(tejido.id, { activo: true, deletedAt: null });

      return {
        message: `Tejido duro restaurado correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: Partial<TejidoDuro>): Partial<TejidoDuro> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
