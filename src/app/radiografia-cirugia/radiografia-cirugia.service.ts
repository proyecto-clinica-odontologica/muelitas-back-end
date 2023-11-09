import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cirugia } from '../cirugia/entities/cirugia.entity';
import { CreateRadiografiaCirugiaDto } from './dto/create-radiografia-cirugia.dto';
import { UpdateRadiografiaCirugiaDto } from './dto/update-radiografia-cirugia.dto';
import { RadiografiaCirugia } from './entities/radiografia-cirugia.entity';

@Injectable()
export class RadiografiaCirugiaService {
  constructor(
    @InjectRepository(RadiografiaCirugia)
    private readonly tblRadiografiaCirugia: Repository<RadiografiaCirugia>,

    @InjectRepository(Cirugia)
    private readonly tblCirugia: Repository<Cirugia>,
  ) {}

  async create(createRadiografiaCirugiaDto: CreateRadiografiaCirugiaDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: createRadiografiaCirugiaDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const radiografiaCirugia = this.tblRadiografiaCirugia.create({
        ...createRadiografiaCirugiaDto,
        cirugia,
      });

      await this.tblRadiografiaCirugia.save(radiografiaCirugia);

      return this.omitirCampos(radiografiaCirugia);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const radiografiasCirugias = await this.tblRadiografiaCirugia.find();
      return this.camposVisibles(radiografiasCirugias);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const radiografiasCirugias = await this.tblRadiografiaCirugia.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(radiografiasCirugias);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const radiografiaCirugia = await this.tblRadiografiaCirugia.findOne({
        where: { id },
        relations: ['cirugia'],
      });

      if (!radiografiaCirugia) {
        throw new NotFoundException('No se encontró la radiografia');
      }

      if (!radiografiaCirugia.activo && checkDeleted) {
        throw new NotFoundException('no se puede restaurar la radiografia porque ya ah sido eliminada');
      }

      if (radiografiaCirugia.deletedAt && !checkDeleted) {
        throw new NotFoundException('La radiografia fue eliminada anteriormente');
      }

      return this.omitirCampos(radiografiaCirugia);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRadiografiaCirugiaDto: UpdateRadiografiaCirugiaDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: updateRadiografiaCirugiaDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const radiografiaCirugia = await this.tblRadiografiaCirugia.preload({
        id,
        ...updateRadiografiaCirugiaDto,
        cirugia,
      });

      if (!radiografiaCirugia) {
        throw new NotFoundException('No se encontró la radiografia');
      }

      await this.tblRadiografiaCirugia.save(radiografiaCirugia);

      return this.omitirCampos(radiografiaCirugia);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const radiografiaCirugia = await this.findOneById(id);

      await this.tblRadiografiaCirugia.update(radiografiaCirugia.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'La radiografia fue eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const radiografiaCirugia = await this.findOneById(id, true);

      await this.tblRadiografiaCirugia.update(radiografiaCirugia.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'La radiografia fue restaurada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(radiografiaCirugia: RadiografiaCirugia) {
    delete radiografiaCirugia?.activo;
    delete radiografiaCirugia?.deletedAt;
    delete radiografiaCirugia?.cirugia?.activo;
    delete radiografiaCirugia?.cirugia?.deletedAt;

    return radiografiaCirugia;
  }

  private camposVisibles(RadiografiasCirugias: RadiografiaCirugia[]) {
    return RadiografiasCirugias.map((radiografiaCirugia) => this.omitirCampos(radiografiaCirugia));
  }
}
