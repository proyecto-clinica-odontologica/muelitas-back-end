import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCasoclinicoDto } from './dto/create-casoclinico.dto';
import { UpdateCasoclinicoDto } from './dto/update-casoclinico.dto';
import { CasoClinico } from './entities/casoclinico.entity';

@Injectable()
export class CasosclinicosService {
  constructor(
    @InjectRepository(CasoClinico)
    private readonly dbCasoClinico: Repository<CasoClinico>,
  ) {}
  async registrarCasoclinico(createCasoclinicoDto: CreateCasoclinicoDto) {
    try {
      const nombre = this.dbCasoClinico.create(createCasoclinicoDto);
      await this.dbCasoClinico.save(nombre);
      return nombre;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El caso clinico ya existe');
      }
      throw error;
    }
  }

  async obtenerCasosclinicos() {
    try {
      const nombre = await this.dbCasoClinico.find();
      return nombre;
    } catch (error) {
      throw error;
    }
  }

  async buscarUnCasoclinico(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarUnCasoclinico(
    id: number,
    updateCasoclinicoDto: UpdateCasoclinicoDto,
  ) {
    try {
      const casoclinico = await this.dbCasoClinico.preload({
        id,
        ...updateCasoclinicoDto,
      });
      if (!casoclinico) {
        throw new BadRequestException('El caso clinico no existe');
      }
      return await this.dbCasoClinico.save(casoclinico);
    } catch (error) {
      throw error;
    }
  }

  async eliminarUnCasoclinico(id: number) {
    try {
      const casoclinico = await this.dbCasoClinico.findOneBy({ id });
      if (!casoclinico) {
        throw new BadRequestException('El caso clinico no existe');
      }
      casoclinico.activo = false;
      await this.dbCasoClinico.save(casoclinico);
      await this.dbCasoClinico.softDelete(id);
      return {
        message: `El caso clinico con el id ${id} ha sido eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarUnCasoclinico(id: number) {
    try {
      await this.dbCasoClinico.restore(id);
      const casoclinico = await this.dbCasoClinico.findOneBy({ id });
      if (!casoclinico) {
        throw new BadRequestException('El Caso clinico no existe');
      }
      casoclinico.activo = true;
      await this.dbCasoClinico.save(casoclinico);
      return {
        message: `El Caso clinico con el id ${id} ha sido restaurado`,
      };
    } catch (error) {
      throw error;
    }
  }
}