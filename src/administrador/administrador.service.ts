import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly dbAdministrador: Repository<Administrador>,
  ) {}
  async registrarAdministrador(createAdministradorDto: CreateAdministradorDto) {
    try {
      const administrador = this.dbAdministrador.create(createAdministradorDto);
      return await this.dbAdministrador.save(administrador);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El codigo de acceso ya existe');
      }
      throw error;
    }
  }

  async obtenerAdministradores() {
    try {
      return this.dbAdministrador.find();
    } catch (error) {
      throw error;
    }
  }

  async buscarUnAdministrador(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarAdministrador(
    id: number,
    updateAdministradorDto: UpdateAdministradorDto,
  ) {
    try {
      const administrador = await this.dbAdministrador.preload({
        id,
        ...updateAdministradorDto,
      });
      if (!administrador) {
        throw new BadRequestException('El administrador no existe');
      }
      return await this.dbAdministrador.save(administrador);
    } catch (error) {
      throw error;
    }
  }

  async eliminarAdministrador(id: number) {
    try {
      const administrador = await this.dbAdministrador.findOneBy({ id });
      if (!administrador) {
        throw new BadRequestException('El administrador no existe');
      }
      administrador.activo = false;
      await this.dbAdministrador.save(administrador);
      await this.dbAdministrador.softRemove(administrador);
      return {
        message: `Administrador con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarAdministrador(id: number) {
    try {
      await this.dbAdministrador.restore(id);
      const administrador = await this.dbAdministrador.findOneBy({ id });
      if (!administrador) {
        throw new BadRequestException('El administrador no existe');
      }
      administrador.activo = true;
      await this.dbAdministrador.save(administrador);
      return {
        message: `Administrador con el id ${id} fue restaurado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
