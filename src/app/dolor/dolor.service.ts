import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDolorDto } from './dto/create-dolor.dto';
import { UpdateDolorDto } from './dto/update-dolor.dto';
import { Dolor } from './entities/dolor.entity';

@Injectable()
export class DolorService {
  constructor(
    @InjectRepository(Dolor)
    private readonly tblDolor: Repository<Dolor>,
  ) {}

  async crearDolorMolar(createDolorDto: CreateDolorDto) {
    try {
      const dolor = this.tblDolor.create(createDolorDto);
      await this.tblDolor.save(dolor);
      return this.omitirCampos(dolor);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el dolor molar');
    }
  }

  async obtenerDoloresMolares() {
    try {
      return await this.tblDolor.find({
        where: { activo: true },
        select: [
          'id',
          'Digastrico',
          'Esternocleidomastoideo',
          'Masetero',
          'PteriogoideoExterno',
          'PteriogoideoInterno',
          'Temporal',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerDoloresMolaresEliminados() {
    try {
      return await this.tblDolor.find({
        where: { activo: false },
        select: [
          'id',
          'Digastrico',
          'Esternocleidomastoideo',
          'Masetero',
          'PteriogoideoExterno',
          'PteriogoideoInterno',
          'Temporal',
        ],
        withDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarDolorMolarPorId(id: number, checkDeleted: boolean = false) {
    try {
      const dolor = await this.tblDolor.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!dolor) {
        throw new NotFoundException('No se encontró el dolor molar');
      }

      if (!checkDeleted && dolor.deletedAt) {
        throw new NotFoundException('El dolor molar ya fue eliminado');
      }

      if (checkDeleted && !dolor.deletedAt) {
        throw new NotFoundException('El dolor molar no fue eliminado');
      }

      return this.omitirCampos(dolor);
    } catch (error) {
      throw error;
    }
  }

  async actualizarDolorMolar(id: number, updateDolorDto: UpdateDolorDto) {
    try {
      const dolor = await this.tblDolor.preload({
        id,
        ...updateDolorDto,
      });

      if (!dolor) {
        throw new NotFoundException('No se encontró el dolor molar');
      }

      await this.tblDolor.save(dolor);

      return this.omitirCampos(dolor);
    } catch (error) {
      throw error;
    }
  }

  async eliminarDolorMolar(id: number) {
    try {
      const dolor = await this.buscarDolorMolarPorId(id);
      await this.tblDolor.update(dolor.id, { activo: false, deletedAt: new Date() });

      return {
        message: `El dolor molar ${dolor.id} fue eliminado correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarDolorMolar(id: number) {
    try {
      const dolor = await this.buscarDolorMolarPorId(id, true);
      await this.tblDolor.update(dolor.id, { activo: true, deletedAt: null });

      return {
        message: `El dolor molar ${dolor.id} fue restaurado correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: Partial<Dolor>): Partial<Dolor> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
