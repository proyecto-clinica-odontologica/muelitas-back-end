import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly dbEstudiante: Repository<Estudiante>,
  ) {}
  async registrarEstudiante(createEstudianteDto: CreateEstudianteDto) {
    try {
      const usuario = this.dbEstudiante.create(createEstudianteDto);
      await this.dbEstudiante.save(usuario);
      return usuario;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El usuario ya existe');
      }
      throw error;
    }
  }

  async obtenerEstudiantes() {
    try {
      const usuarios = await this.dbEstudiante.find();
      return usuarios;
    } catch (error) {
      throw error;
    }
  }

  async buscarUnEstudiante(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarUnEstudiante(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ) {
    try {
      const estudiante = await this.dbEstudiante.preload({
        id,
        ...updateEstudianteDto,
      });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no existe');
      }
      return await this.dbEstudiante.save(estudiante);
    } catch (error) {
      throw error;
    }
  }

  async eliminarUnEstudiante(id: number) {
    try {
      const estudiante = await this.dbEstudiante.findOneBy({ id });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no existe');
      }
      estudiante.activo = false;
      await this.dbEstudiante.save(estudiante);
      await this.dbEstudiante.softDelete(id);
      return {
        message: `El estudiante con el id ${id} ha sido eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarUnEstudiante(id: number) {
    try {
      await this.dbEstudiante.restore(id);
      const estudiante = await this.dbEstudiante.findOneBy({ id });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no existe');
      }
      estudiante.activo = true;
      await this.dbEstudiante.save(estudiante);
      return {
        message: `El estudiante con el id ${id} ha sido restaurado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
