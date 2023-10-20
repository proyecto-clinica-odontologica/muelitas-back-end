import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOdontogramaDto } from './dto/create-odontograma.dto';
import { UpdateOdontogramaDto } from './dto/update-odontograma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Odontograma } from './entities/odontograma.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OdontogramaService {

  constructor(
    @InjectRepository(Odontograma)
    private dbOdontograma: Repository<Odontograma>,

  ) {}

  async create(createOdontogramaDto: CreateOdontogramaDto) {
    createOdontogramaDto.Nombre = createOdontogramaDto.Nombre.toUpperCase();
    createOdontogramaDto.Estado = createOdontogramaDto.Estado.toUpperCase();
    createOdontogramaDto.Numero = createOdontogramaDto.Numero;

    try {
      const odontograma = this.dbOdontograma.create(createOdontogramaDto);
      await this.dbOdontograma.save(odontograma);
      return odontograma;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbOdontograma.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    let odontograma: Odontograma;
    try {
      if (isNaN(+id)) {
        odontograma = await this.dbOdontograma.findOneBy({ Nombre: id });
      } else {
        odontograma = await this.dbOdontograma.findOneBy({ IdOdontograma: +id });
      }

      if (!odontograma) {
        throw new NotFoundException(
          `no existe un autor con el id ${id} en la base de datos`,
        );
      }

      return odontograma;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOdontogramaDto: UpdateOdontogramaDto) {
    updateOdontogramaDto.Nombre = updateOdontogramaDto.Nombre?.toUpperCase();
    updateOdontogramaDto.Estado = updateOdontogramaDto.Estado?.toUpperCase();
    updateOdontogramaDto.Numero = updateOdontogramaDto.Numero;

    try {
      const odontograma = await this.dbOdontograma.preload({
        IdOdontograma: id,
        ...updateOdontogramaDto,
      });
      await this.dbOdontograma.save(odontograma);
      return odontograma;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const odontograma = await this.findOne(id);
      await this.dbOdontograma.remove(odontograma);
      return {
        message: `autor con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}

