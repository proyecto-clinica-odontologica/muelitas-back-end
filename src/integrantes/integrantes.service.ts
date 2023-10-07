import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { Integrante } from './entities/integrante.entity';

@Injectable()
export class IntegrantesService {
  constructor(
    @InjectRepository(Integrante)
    private readonly dbIntegrante: Repository<Integrante>,
  ) {}

  async registrarIntegrantes(createIntegranteDto: CreateIntegranteDto) {
    try {
      const integrante = this.dbIntegrante.create(createIntegranteDto);
      return await this.dbIntegrante.save(integrante);
    } catch (error) {
      throw error;
    }
  }

  async obtenerIntegrantes() {
    try {
      return this.dbIntegrante.find();
    } catch (error) {
      throw error;
    }
  }

  async buscarUnIntegrante(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarIntegrante(
    id: number,
    updateIntegranteDto: UpdateIntegranteDto,
  ) {
    try {
      const integrante = await this.dbIntegrante.preload({
        id,
        ...updateIntegranteDto,
      });
      if (!integrante) {
        throw new NotFoundException('Integrante no existe');
      }
      return await this.dbIntegrante.save(integrante);
    } catch (error) {
      throw error;
    }
  }

  async eliminarIntegrante(id: number) {
    try {
      const integrante = await this.dbIntegrante.preload({
        id,
        activo: false,
      });
      if (!integrante) {
        throw new NotFoundException(
          'Integrante nunca llego a inscribirse a la clase',
        );
      }
      await this.dbIntegrante.save(integrante);
      await this.dbIntegrante.softDelete({ id });
      return {
        message: 'Integrante eliminado',
      };
    } catch (error) {
      throw error;
    }
  }

  async restaurarIntegrante(id: number) {
    try {
      await this.dbIntegrante.restore(id);
      const integrante = await this.dbIntegrante.preload({ id, activo: true });
      if (!integrante) {
        throw new NotFoundException(
          'Integrante nunca llego a inscribirse a la clase',
        );
      }
      await this.dbIntegrante.save(integrante);
      return {
        message: 'Integrante restaurado',
      };
    } catch (error) {
      throw error;
    }
  }
}
