import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { Sede } from './entities/sede.entity';

@Injectable()
export class SedesService {
  constructor(
    @InjectRepository(Sede)
    private readonly dbSede: Repository<Sede>,
  ) {}

  async registrarSede(createSedeDto: CreateSedeDto) {
    try {
      const sede = this.dbSede.create(createSedeDto);
      return await this.dbSede.save(sede);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El correo o el celular ya existe');
      }
      throw error;
    }
  }

  async obtenerSedes() {
    try {
      return this.dbSede.find();
    } catch (error) {
      throw error;
    }
  }

  async buscarUnaSede(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarSede(id: number, updateSedeDto: UpdateSedeDto) {
    try {
      const sedes = await this.dbSede.preload({
        id,
        ...updateSedeDto,
      });
      if (!sedes) {
        throw new BadRequestException(`La sede con el id ${id} no existe`);
      }
      return this.dbSede.save(sedes);
    } catch (error) {
      throw error;
    }
  }

  async eliminarSede(id: number) {
    try {
      const sede = await this.dbSede.findOneBy({ id });
      if (!sede) {
        throw new BadRequestException(`La sede con el id ${id} no existe`);
      }
      sede.activo = false;
      await this.dbSede.save(sede);
      await this.dbSede.softDelete(id);
      return { message: 'Sede eliminada' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarSede(id: number) {
    try {
      await this.dbSede.restore(id);

      const sede = await this.dbSede.findOneBy({ id });
      if (!sede) {
        throw new BadRequestException(`La sede con el id ${id} no existe`);
      }
      sede.activo = true;
      await this.dbSede.save(sede);
      return { message: 'Sede restaurada' };
    } catch (error) {
      throw error;
    }
  }
}
