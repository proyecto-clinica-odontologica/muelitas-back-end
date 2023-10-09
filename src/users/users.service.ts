import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,
  ) {}

  async obtenerUsuarios() {
    return this.dbUser.find();
  }

  async obtenerUsuariosEliminados() {
    return this.dbUser.find({ withDeleted: true });
  }

  async buscarUsuarioPorCorreo(correo: string) {
    try {
      const usuario = await this.dbUser.findOneBy({ Correo: correo });
      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el correo ${correo} no existe en la base de datos`,
        );
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async buscarUsuarioPorCelular(celular: string) {
    try {
      const usuario = await this.dbUser.findOneBy({ Celular: celular });
      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el celular ${celular} no existe en la base de datos`,
        );
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async buscarUsuarioPorRol(rol: string) {
    try {
      const usuario = await this.dbUser.find({ where: { Rol: rol } });
      if (!usuario.length) {
        throw new NotFoundException(
          `El usuario con el rol ${rol} no existe en la base de datos`,
        );
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async buscarUsuarioPorEstado(condicion: string) {
    const estado = condicion === 'activo' ? true : false;
    try {
      const usuario = await this.dbUser.find({ where: { activo: estado } });
      if (!usuario.length) {
        throw new NotFoundException(
          `El usuario ${condicion} no existe en la base de datos`,
        );
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async buscarUsuarioPorId(id: number) {
    try {
      const usuario = await this.dbUser.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el id ${id} no existe en la base de datos`,
        );
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }
}