import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cirugia } from '../cirugia/entities/cirugia.entity';
import { CreateInterpretacionRadiograficaDto } from './dto/create-interpretacion-radiografica.dto';
import { UpdateInterpretacionRadiograficaDto } from './dto/update-interpretacion-radiografica.dto';
import { InterpretacionRadiografica } from './entities/interpretacion-radiografica.entity';

@Injectable()
export class InterpretacionRadiograficaService {
  constructor(
    @InjectRepository(InterpretacionRadiografica)
    private readonly tblInterpretacionRadiografica: Repository<InterpretacionRadiografica>,

    @InjectRepository(Cirugia)
    private readonly tblCirugia: Repository<Cirugia>,
  ) {}

  async create(createInterpretacionRadiograficaDto: CreateInterpretacionRadiograficaDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: createInterpretacionRadiograficaDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const interpretacionRadiografica = this.tblInterpretacionRadiografica.create({
        ...createInterpretacionRadiograficaDto,
        cirugia,
      });

      await this.tblInterpretacionRadiografica.save(interpretacionRadiografica);

      return this.omitirCampos(interpretacionRadiografica);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const interpretacionesRadiograficas = await this.tblInterpretacionRadiografica.find();
      return this.camposVisibles(interpretacionesRadiograficas);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const interpretacionesRadiograficas = await this.tblInterpretacionRadiografica.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(interpretacionesRadiograficas);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const interpretacionRadiografica = await this.tblInterpretacionRadiografica.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!interpretacionRadiografica) {
        throw new NotFoundException('No se encontró la interpretacion radiografica');
      }

      if (checkDeleted && !interpretacionRadiografica.activo) {
        throw new NotFoundException('no se puede restaurar la interpretacion radiografica porque ya ha sido eliminada');
      }
      if (interpretacionRadiografica.deletedAt && !checkDeleted) {
        throw new NotFoundException('la interpretacion radiografica fue eliminada anteriormente');
      }

      return this.omitirCampos(interpretacionRadiografica);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateInterpretacionRadiograficaDto: UpdateInterpretacionRadiograficaDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: updateInterpretacionRadiograficaDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const interpretacionRadiografica = await this.tblInterpretacionRadiografica.preload({
        id,
        ...updateInterpretacionRadiograficaDto,
        cirugia,
      });

      if (!interpretacionRadiografica) {
        throw new NotFoundException('No se encontró la interpretacion radiografica');
      }

      await this.tblInterpretacionRadiografica.save(interpretacionRadiografica);

      return this.omitirCampos(interpretacionRadiografica);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const interpretacionRadiografica = await this.findOneById(id);

      await this.tblInterpretacionRadiografica.update(interpretacionRadiografica.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'La interpretacion radiografica fue eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const interpretacionRadiografica = await this.findOneById(id, true);

      await this.tblInterpretacionRadiografica.update(interpretacionRadiografica.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'La interpretacion radiografica fue restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(interpretacionRadiografica: InterpretacionRadiografica) {
    delete interpretacionRadiografica?.activo;
    delete interpretacionRadiografica?.deletedAt;
    delete interpretacionRadiografica?.cirugia?.activo;
    delete interpretacionRadiografica?.cirugia?.deletedAt;

    return interpretacionRadiografica;
  }

  private camposVisibles(informesQuirurgicos: InterpretacionRadiografica[]) {
    return informesQuirurgicos.map((informeQuirurgico) => this.omitirCampos(informeQuirurgico));
  }
}
