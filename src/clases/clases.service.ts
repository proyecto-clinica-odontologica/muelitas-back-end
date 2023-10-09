import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Repository } from 'typeorm';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { Clase } from './entities/clase.entity';

@Injectable()
export class ClasesService {
  constructor(
    @InjectRepository(Clase)
    private readonly dbClase: Repository<Clase>,

    @InjectRepository(Docente)
    private readonly dbDocente: Repository<Docente>,
  ) {}

  async registrarClase(createClaseDto: CreateClaseDto) {
    try {
      const docente = await this.dbDocente.findOne({
        where: { id: createClaseDto.idDocente },
      });

      if (!docente) {
        throw new NotFoundException(
          'El docente no se encuentra registrado en la base de datos',
        );
      }


      const clase = this.dbClase.create({
        ...createClaseDto,
        docente: docente,
      });


      return await this.dbClase.save(clase);
    } catch (error) {
      throw error;
    }
  }

  async obtenerClases() {
    try {
      return this.dbClase.find();
    } catch (error) {
      throw error;
    }
  }

  async BuscarUnaClase(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async BuscarClasePorPeriodo(idPeriodo: number) {}
  async BuscarClasePorPeriodoDocente(idDocente: number, idPeriodo: number) {}
  async BuscarClasePorPeriodoDocenteCurso(
    idDocente: number,
    idPeriodo: number,
    idCurso: number,
  ) {}

  async actualizarClase(id: number, updateClaseDto: UpdateClaseDto) {
    try {
      const clase = await this.dbClase.preload({
        id,
        ...updateClaseDto,
      });
      if (!clase) {
        throw new NotFoundException('Clase no existe');
      }
      return await this.dbClase.save(clase);
    } catch (error) {
      throw error;
    }
  }

  async eliminarClase(id: number) {
    try {
      const clase = await this.dbClase.preload({
        id,
        activo: false,
      });
      if (!clase) {
        throw new NotFoundException('La clase no existe');
      }
      await this.dbClase.save(clase);
      await this.dbClase.softDelete(id);
      return { mensaje: `La Clase con el id ${id} fue eliminada` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarClase(id: number) {
    try {
      await this.dbClase.restore(id);
      const clase = await this.dbClase.preload({
        id,
        activo: true,
      });
      if (!clase) {
        throw new NotFoundException('La clase no existe');
      }
      await this.dbClase.save(clase);
      return { mensaje: `La Clase con el id ${id} fue restaurada` };
    } catch (error) {
      throw error;
    }
  }
}
