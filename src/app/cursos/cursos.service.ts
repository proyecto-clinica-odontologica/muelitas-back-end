import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly dbCurso: Repository<Curso>,
  ) {}

  async registrarCurso(createCursoDto: CreateCursoDto) {
    try {
      const curso = this.dbCurso.create(createCursoDto);
      await this.dbCurso.save(curso);
      return curso;
    } catch (error) {
      throw error;
    }
  }

  async obtenerCursos() {
    try {
      return await this.dbCurso.find();
    } catch (error) {
      throw error;
    }
  }

  async obtenerCursosEliminados() {
    try {
      return await this.dbCurso.find({ withDeleted: true });
    } catch (error) {
      throw error;
    }
  }

  async buscarCursoPorId(id: number) {
    try {
      const curso = await this.dbCurso.findOne({
        where: { id },
        select: ['Nombre', 'Semestre', 'Malla'],
      });
      if (!curso) {
        throw new NotFoundException('Curso no existe');
      }
      return curso;
    } catch (error) {
      throw error;
    }
  }

  async buscarCursoPorNombre(nombre: string) {
    try {
      const curso = await this.dbCurso.findOne({
        where: { Nombre: nombre },
        select: ['Nombre', 'Semestre', 'Malla'],
      });
      if (!curso) {
        throw new NotFoundException('Curso no existe');
      }
      return curso;
    } catch (error) {
      throw error;
    }
  }

  async actualizarCurso(id: number, updateCursoDto: UpdateCursoDto) {
    try {
      const curso = await this.dbCurso.preload({
        id,
        ...updateCursoDto,
      });
      if (!curso) {
        throw new NotFoundException('Curso no existe');
      }
      return await this.dbCurso.save(curso);
    } catch (error) {
      throw error;
    }
  }

  async eliminarCurso(id: number) {
    try {
      const curso = await this.dbCurso.preload({
        id,
        activo: false,
      });
      if (!curso) {
        throw new NotFoundException('Curso no existe');
      }
      await this.dbCurso.save(curso);
      await this.dbCurso.softDelete(id);
      return { message: `Curso con el id ${id} fue eliminado` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarCurso(id: number) {
    try {
      await this.dbCurso.restore(id);
      const curso = await this.dbCurso.preload({
        id,
        activo: true,
      });
      if (!curso) {
        throw new NotFoundException('Curso no existe');
      }
      await this.dbCurso.save(curso);
      return { message: `Curso con el id ${id} fue restaurado` };
    } catch (error) {
      throw error;
    }
  }
}
