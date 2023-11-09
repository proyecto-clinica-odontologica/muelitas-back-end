import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cirugia } from '../cirugia/entities/cirugia.entity';
import { CreateInformeQuirurgicoDto } from './dto/create-informe-quirurgico.dto';
import { UpdateInformeQuirurgicoDto } from './dto/update-informe-quirurgico.dto';
import { InformeQuirurgico } from './entities/informe-quirurgico.entity';

@Injectable()
export class InformeQuirurgicoService {
  constructor(
    @InjectRepository(InformeQuirurgico)
    private readonly tblInformeQuirurgico: Repository<InformeQuirurgico>,

    @InjectRepository(Cirugia)
    private readonly tblCirugia: Repository<Cirugia>,
  ) {}

  async create(createInformeQuirurgicoDto: CreateInformeQuirurgicoDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: createInformeQuirurgicoDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const informeQuirurgico = this.tblInformeQuirurgico.create({
        ...createInformeQuirurgicoDto,
        cirugia,
      });

      await this.tblInformeQuirurgico.save(informeQuirurgico);

      return this.omitirCampos(informeQuirurgico);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const informesQuirurgicos = await this.tblInformeQuirurgico.find();
      return this.camposVisibles(informesQuirurgicos);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const informesQuirurgicos = await this.tblInformeQuirurgico.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(informesQuirurgicos);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const informeQuirurgico = await this.tblInformeQuirurgico.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!informeQuirurgico) {
        throw new NotFoundException('No se encontró el informe quirúrgico');
      }

      if (!informeQuirurgico.activo && checkDeleted) {
        throw new NotFoundException('No se puede restaurar un informe quirúrgico que no fue eliminado');
      }

      if (informeQuirurgico.deletedAt && !checkDeleted) {
        throw new NotFoundException('El informe quirúrgico fue eliminado anteriormente');
      }

      return this.omitirCampos(informeQuirurgico);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateInformeQuirurgicoDto: UpdateInformeQuirurgicoDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id: updateInformeQuirurgicoDto.CirugiaId },
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró la cirugia');
      }

      const informeQuirurgico = await this.tblInformeQuirurgico.preload({
        id,
        ...updateInformeQuirurgicoDto,
        cirugia,
      });

      if (!informeQuirurgico) {
        throw new NotFoundException('No se encontró el informe quirurgico');
      }

      await this.tblInformeQuirurgico.save(informeQuirurgico);

      return this.omitirCampos(informeQuirurgico);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const informeQuirurgico = await this.findOneById(id);
      await this.tblInformeQuirurgico.update(informeQuirurgico.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'El informe quirúrgico fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const informeQuirurgico = await this.findOneById(id, true);
      await this.tblInformeQuirurgico.update(informeQuirurgico.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'El informe quirúrgico fue restaurado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(informeQuirurgico: InformeQuirurgico) {
    delete informeQuirurgico?.activo;
    delete informeQuirurgico?.deletedAt;
    delete informeQuirurgico?.cirugia?.activo;
    delete informeQuirurgico?.cirugia?.deletedAt;

    return informeQuirurgico;
  }

  private camposVisibles(informesQuirurgicos: InformeQuirurgico[]) {
    return informesQuirurgicos.map((informeQuirurgico) => this.omitirCampos(informeQuirurgico));
  }
}
