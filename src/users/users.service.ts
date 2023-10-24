import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Sede } from 'src/sedes/entities/sede.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    @InjectRepository(Sede)
    private readonly dbSede: Repository<Sede>,
  ) {}
  // TODO revisar
  async obtenerUsuarioId(id: number) {
    const usuario = await this.dbUser.findOne({
      where: { id },
      relations: ['sede', 'sede.empresa'],
    });

    if (!usuario) {
      throw new NotFoundException(`El usuario con el id ${id} no existe en la base de datos`);
    }
    const sedeId = usuario.sede.id;
    const empresaId = usuario.sede.empresa.id;
    delete usuario.sede;
    delete usuario.deletedAt;
    delete usuario.activo;

    return {
      ...usuario,
      SedeId: sedeId,
      EmpresaId: empresaId,
    };
  }

  async obtenerUsuarios(paginationDto: PaginationDto) {
    // paginationDto.order = paginationDto.order === 'desc' ? 'DESC' : 'ASC';

    // const { page = 0, limit = 10, order = 'ASC' } = paginationDto;
    const usuarios = await this.dbUser.find({
      // take: limit,
      // skip: page,
      relations: ['sede'],
      select: ['id', 'Nombre', 'Apellido', 'Correo', 'Celular', 'Rol', 'NumDoc'],
    });
    return usuarios;
  }

  async obtenerUsuariosEliminados() {
    return await this.dbUser.find({
      withDeleted: true,
      where: { activo: false },
    });
  }

  async buscarUsuarioPorCorreo(correo: string) {
    try {
      const usuario = await this.dbUser.findOneBy({ Correo: correo });
      if (!usuario) {
        throw new NotFoundException(`El usuario con el correo ${correo} no existe en la base de datos`);
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
        throw new NotFoundException(`El usuario con el celular ${celular} no existe en la base de datos`);
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
        throw new NotFoundException(`El usuario con el rol ${rol} no existe en la base de datos`);
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
        throw new NotFoundException(`El usuario ${condicion} no existe en la base de datos`);
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
        throw new NotFoundException(`El usuario con el id ${id} no existe en la base de datos`);
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async buscarDocentePorSede(idSede: number) {
    console.log(idSede);
    try {
      const sede = await this.dbUser.find({
        where: {
          Rol: 'docente',
          sede: {
            id: idSede,
          },
        },
      });

      if (!sede) {
        throw new NotFoundException(`La sede con el id ${idSede} no existe en la base de datos`);
      }

      return sede;
    } catch (error) {
      throw error;
    }
  }

  async buscarUsuarioPorSede(nombreSede: string) {
    try {
      const sede = await this.dbSede.findOne({
        where: { Nombre: nombreSede },
        relations: ['usuario'],
      });

      if (!sede) {
        throw new NotFoundException(`La sede ${nombreSede} no existe en la base de datos`);
      }

      console.log(sede.usuario);
      return sede.usuario;
    } catch (error) {
      throw error;
    }
  }
}
