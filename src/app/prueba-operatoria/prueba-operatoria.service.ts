import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operatoria } from '../operatoria/entities/operatoria.entity';
import { CreatePruebaOperatoriaDto } from './dto/create-prueba-operatoria.dto';
import { UpdatePruebaOperatoriaDto } from './dto/update-prueba-operatoria.dto';
import { PruebaOperatoria } from './entities/prueba-operatoria.entity';

@Injectable()
export class PruebaOperatoriaService {
  constructor(
    @InjectRepository(PruebaOperatoria)
    private readonly tblPruebaOperatoria: Repository<PruebaOperatoria>,

    @InjectRepository(Operatoria)
    private readonly tblOperatoria: Repository<Operatoria>,
  ) {}

  async create(createPruebaOperatoriaDto: CreatePruebaOperatoriaDto) {
    try {
      const operatoria = await this.tblOperatoria.findOne({
        where: { id: createPruebaOperatoriaDto.OperatoriaId },
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      const pruebaOperatoria = this.tblPruebaOperatoria.create({
        ...createPruebaOperatoriaDto,
        operatoria,
      });

      await this.tblPruebaOperatoria.save(pruebaOperatoria);

      return this.omitirCampos(pruebaOperatoria);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const pruebasOperatorias = await this.tblPruebaOperatoria.find();
      return this.camposVisibles(pruebasOperatorias);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const pruebasOperatorias = await this.tblPruebaOperatoria.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(pruebasOperatorias);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const pruebaOperatoria = await this.tblPruebaOperatoria.findOne({
        where: { id },
        relations: ['operatoria'],
      });

      if (!pruebaOperatoria) {
        throw new NotFoundException('No se encontró la prueba operatoria');
      }

      if (!pruebaOperatoria.deletedAt && checkDeleted) {
        throw new NotFoundException('no se puede restaurar porque no fue eliminada');
      }

      if (pruebaOperatoria.deletedAt && !checkDeleted) {
        throw new NotFoundException('La prueba operatoria fue eliminada anteriormente');
      }

      return this.omitirCampos(pruebaOperatoria);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePruebaOperatoriaDto: UpdatePruebaOperatoriaDto) {
    try {
      const operatoria = await this.tblOperatoria.findOne({
        where: { id: updatePruebaOperatoriaDto.OperatoriaId },
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      const pruebaOperatoria = await this.tblPruebaOperatoria.preload({
        id,
        ...updatePruebaOperatoriaDto,
        operatoria,
      });

      if (!pruebaOperatoria) {
        throw new NotFoundException('No se encontró la prueba operatoria');
      }

      await this.tblPruebaOperatoria.save(pruebaOperatoria);

      return this.omitirCampos(pruebaOperatoria);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const pruebaOperatoria = await this.findOneById(id);
      await this.tblPruebaOperatoria.update(pruebaOperatoria.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'La prueba operatoria fue eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const pruebaOperatoria = await this.findOneById(id, true);

      await this.tblPruebaOperatoria.update(pruebaOperatoria.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'La prueba operatoria fue restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(pruebaOperatoria: PruebaOperatoria) {
    delete pruebaOperatoria?.activo;
    delete pruebaOperatoria?.deletedAt;
    delete pruebaOperatoria?.operatoria?.activo;
    delete pruebaOperatoria?.operatoria?.deletedAt;

    return pruebaOperatoria;
  }

  private camposVisibles(pruebasOperatorias: PruebaOperatoria[]) {
    return pruebasOperatorias.map((pruebaOperatoria) => this.omitirCampos(pruebaOperatoria));
  }
}
