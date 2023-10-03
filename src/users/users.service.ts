import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async buscarUnUsuario(terminoBusqueda: string) {
    let usuario: User;
    try {
      const query = this.dbUser.createQueryBuilder('usuario');
      if (isNaN(+terminoBusqueda)) {
        usuario = await query
          .where(
            'usuario.Correo = :Correo or usuario.Nombre = :Nombre or usuario.Apellido = :Apellido',
            {
              Correo: terminoBusqueda,
              Nombre: terminoBusqueda,
              Apellido: terminoBusqueda,
            },
          )
          .getOne();
      } else {
        usuario = await query
          .where(
            'usuario.NumDoc = :NumDoc or usuario.Celular = :Celular or usuario.id = :id',
            {
              NumDoc: terminoBusqueda,
              Celular: terminoBusqueda,
              id: terminoBusqueda,
            },
          )
          .getOne();
      }

      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el id ${terminoBusqueda} no existe en la base de datos`,
        );
      }

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  actualizarUsuario(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async eliminarUsuario(id: number) {
    try {
      const usuario = await this.dbUser.findOneBy(id);
      if (!usuario) {
        throw new NotFoundException(
          `El usuario con el id ${id} no existe en la base de datos`,
        );
      }
      await this.dbUser.softDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
