import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operatoria } from '../operatoria/entities/operatoria.entity';
import { CreateTecnicaRadiograficaDto } from './dto/create-tecnica-radiografica.dto';
import { UpdateTecnicaRadiograficaDto } from './dto/update-tecnica-radiografica.dto';
import { TecnicaRadiografica } from './entities/tecnica-radiografica.entity';

@Injectable()
export class TecnicaRadiograficaService {
  constructor(
    @InjectRepository(TecnicaRadiografica)
    private readonly tblTecnicaRadiografica: Repository<TecnicaRadiografica>,

    @InjectRepository(Operatoria)
    private readonly tblOperatoria: Repository<Operatoria>,
  ) {}

  async create(createTecnicaRadiograficaDto: CreateTecnicaRadiograficaDto) {
    try {
      const operatoria = await this.tblOperatoria.findOne({
        where: { id: createTecnicaRadiograficaDto.OperatoriaId },
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      const tecnicaRadiografica = this.tblTecnicaRadiografica.create({
        ...createTecnicaRadiograficaDto,
        operatoria,
      });

      await this.tblTecnicaRadiografica.save(tecnicaRadiografica);

      return this.omitirCampos(tecnicaRadiografica);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const tecnicasRadiograficas = await this.tblTecnicaRadiografica.find();
      return this.camposVisibles(tecnicasRadiograficas);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const tecnicasRadiograficas = await this.tblTecnicaRadiografica.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(tecnicasRadiograficas);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const tecnicaRadiografica = await this.tblTecnicaRadiografica.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!tecnicaRadiografica) {
        throw new NotFoundException('No se encontró la técnica radiográfica');
      }

      if (!tecnicaRadiografica.deletedAt && checkDeleted) {
        throw new NotFoundException('No se puede restaurar una técnica radiográfica que no está eliminada');
      }

      if (tecnicaRadiografica.deletedAt && !checkDeleted) {
        throw new NotFoundException('La técnica radiográfica fue eliminada anteriormente');
      }

      return this.omitirCampos(tecnicaRadiografica);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTecnicaRadiograficaDto: UpdateTecnicaRadiograficaDto) {
    try {
      const operatoria = await this.tblOperatoria.findOne({
        where: { id: updateTecnicaRadiograficaDto.OperatoriaId },
      });

      if (!operatoria) {
        throw new NotFoundException('No se encontró la operatoria');
      }

      const tecnicaRadiografica = await this.tblTecnicaRadiografica.preload({
        id,
        ...updateTecnicaRadiograficaDto,
        operatoria,
      });

      if (!tecnicaRadiografica) {
        throw new NotFoundException('No se encontró la técnica radiográfica');
      }

      await this.tblTecnicaRadiografica.save(tecnicaRadiografica);

      return this.omitirCampos(tecnicaRadiografica);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const tecnicaRadiografica = await this.findOneById(id);
      await this.tblTecnicaRadiografica.update(tecnicaRadiografica.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'La técnica radiográfica fue eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const tecnicaRadiografica = await this.findOneById(id, true);
      await this.tblTecnicaRadiografica.update(tecnicaRadiografica.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'La técnica radiográfica fue restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(tecnicaRadiografica: TecnicaRadiografica) {
    delete tecnicaRadiografica?.activo;
    delete tecnicaRadiografica?.deletedAt;
    delete tecnicaRadiografica?.operatoria?.activo;
    delete tecnicaRadiografica?.operatoria?.deletedAt;

    return tecnicaRadiografica;
  }

  private camposVisibles(tecnicasRadiograficas: TecnicaRadiografica[]) {
    return tecnicasRadiograficas.map((tecnicaRadiografica) => this.omitirCampos(tecnicaRadiografica));
  }
}
