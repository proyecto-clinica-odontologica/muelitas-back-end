import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly dbEstudiante: Repository<Estudiante>,

    @InjectRepository(User)
    private readonly dbUsuario: Repository<User>,
  ) {}

  async registrarEstudiante(
    createEstudianteDto: CreateEstudianteDto,
    createUserDto: CreateUserDto,
  ) {
    try {
      const usuario = this.dbUsuario.create(createUserDto);
      await this.dbUsuario.save(usuario);

      const estudiante = this.dbEstudiante.create(createEstudianteDto);
      estudiante.usuario = usuario;
      await this.dbEstudiante.save(estudiante);
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

  async obtenerEstudiantesEliminados() {
    try {
      const usuarios = await this.dbEstudiante.find({ withDeleted: true });
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
