import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente } from './entities/docente.entity';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente)
    private readonly dbDocente: Repository<Docente>,
  ) {}
  async registrarDocente(createDocenteDto: CreateDocenteDto) {
    try {
      const docente = this.dbDocente.create(createDocenteDto);
      return await this.dbDocente.save(docente);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'Ya existe un docente con la misma colegiatura o firma digital',
        );
      }
      throw error;
    }
  }

  async ObtenerDocentes() {
    try {
      return await this.dbDocente.find();
    } catch (error) {
      throw error;
    }
  }

  async obtenerUnDocente(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarDocente(id: number, updateDocenteDto: UpdateDocenteDto) {
    try {
      const docente = await this.dbDocente.preload({
        id,
        ...updateDocenteDto,
      });
      if (!docente) {
        throw new BadRequestException(
          'No existe el docente que desea actualizar',
        );
      }
      return await this.dbDocente.save(docente);
    } catch (error) {
      throw error;
    }
  }

  async eliminarDocente(id: number) {
    try {
      const docente = await this.dbDocente.findOneBy({ id });
      if (!docente) {
        throw new BadRequestException(
          'No existe el docente que desea eliminar',
        );
      }
      docente.activo = false;
      await this.dbDocente.save(docente);
      await this.dbDocente.softDelete(id);
      return {
        message: 'Docente eliminado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarDocente(id: number) {
    try {
      await this.dbDocente.restore(id);
      const docente = await this.dbDocente.findOneBy({ id });
      if (!docente) {
        throw new BadRequestException(
          'No existe el docente que desea restaurar',
        );
      }
      docente.activo = true;
      await this.dbDocente.save(docente);
      return {
        message: 'Docente restaurado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }
}
