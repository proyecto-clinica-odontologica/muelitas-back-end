import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCasoclinicoDto } from './dto/create-subcasoclinico.dto';
import { UpdateSubCasoclinicoDto } from './dto/update-subcasoclinico.dto';
import { SubCasoClinico } from './entities/subcasoclinico.entity';

@Injectable()
export class SubcasoclinicoService {
  constructor(
    @InjectRepository(SubCasoClinico)
    private readonly dbSubCasoClinico: Repository<SubCasoClinico>,
  ) {}
  async registrarsubCasoclinico(createSubCasoclinicoDto: CreateSubCasoclinicoDto) {
    try {
      const nombre = this.dbSubCasoClinico.create(createSubCasoclinicoDto);
      await this.dbSubCasoClinico.save(nombre);
      return nombre;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El sub caso clinico ya existe');
      }
      throw error;
    }
  }

  async obtenersubCasosclinicos() {
    try {
      const nombre = await this.dbSubCasoClinico.find();
      return nombre;
    } catch (error) {
      throw error;
    }
  }

  async buscarUnsubCasoclinico(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarsubUnCasoclinico(
    id: number,
    updateCasoclinicoDto: UpdateSubCasoclinicoDto,
  ) {
    try {
      const casoclinico = await this.dbSubCasoClinico.preload({
        id,
        ...updateCasoclinicoDto,
      });
      if (!casoclinico) {
        throw new BadRequestException('El sub caso clinico no existe');
      }
      return await this.dbSubCasoClinico.save(casoclinico);
    } catch (error) {
      throw error;
    }
  }

  async eliminarUnsubCasoclinico(id: number) {
    try {
      const subcasoclinico = await this.dbSubCasoClinico.findOneBy({ id });
      if (!subcasoclinico) {
        throw new BadRequestException('El sub caso clinico no existe');
      }
      subcasoclinico.activo = false;
      await this.dbSubCasoClinico.save(subcasoclinico);
      await this.dbSubCasoClinico.softDelete(id);
      return {
        message: `El sub caso clinico con el id ${id} ha sido eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarUnsubCasoclinico(id: number) {
    try {
      await this.dbSubCasoClinico.restore(id);
      const subcasoclinico = await this.dbSubCasoClinico.findOneBy({ id });
      if (!subcasoclinico) {
        throw new BadRequestException('El sub Caso clinico no existe');
      }
      subcasoclinico.activo = true;
      await this.dbSubCasoClinico.save(subcasoclinico);
      return {
        message: `El sub Caso clinico con el id ${id} ha sido restaurado`,
      };
    } catch (error) {
      throw error;
    }
  }
}