import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cirugia } from '../cirugia/entities/cirugia.entity';
import { CreateEstadoPostquirurgicoDto } from './dto/create-estado-postquirurgico.dto';
import { UpdateEstadoPostquirurgicoDto } from './dto/update-estado-postquirurgico.dto';
import { EstadoPostquirurgico } from './entities/estado-postquirurgico.entity';

@Injectable()
export class EstadoPostquirurgicoService {
  constructor(
    @InjectRepository(EstadoPostquirurgico)
    private tblEstadoPostQuirurjico: Repository<EstadoPostquirurgico>,

    @InjectRepository(Cirugia)
    private tblCirugia: Repository<Cirugia>,
  ) {}

  async create(createEstadoPostQuirurjico: CreateEstadoPostquirurgicoDto) {
    try {
      const cirugia = await this.tblCirugia.findOne({ where: { id: createEstadoPostQuirurjico.CirujiaId } });

      if (!cirugia) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const estadoPostQuirurgico = this.tblEstadoPostQuirurjico.create({
        ...createEstadoPostQuirurjico,
        cirugia,
      });

      await this.tblEstadoPostQuirurjico.save(estadoPostQuirurgico);

      return this.omitirCampos(estadoPostQuirurgico);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const estadosPostQuirurgicos = await this.tblEstadoPostQuirurjico.find();
      return this.camposVisibles(estadosPostQuirurgicos);
    } catch (error) {
      throw error;
    }
  }

  async findAllDelete() {
    try {
      const estadosPostQuirurgicos = await this.tblEstadoPostQuirurjico.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(estadosPostQuirurgicos);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const estadoPostQuirurgico = await this.tblEstadoPostQuirurjico.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!estadoPostQuirurgico) throw { message: 'No se encontró es estado post quirurgico' };

      if (estadoPostQuirurgico.deletedAt && !checkDeleted) {
        throw new BadRequestException('El estado post quirurgico fue eliminado anteriormente');
      }

      if (!estadoPostQuirurgico.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar un estado post quirurgico que no ha sido eliminada');
      }

      return this.omitirCampos(estadoPostQuirurgico);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCirugiaDto: UpdateEstadoPostquirurgicoDto) {
    try {
      const estadoPostQuirurgico = await this.tblEstadoPostQuirurjico.preload({
        id,
        ...updateCirugiaDto,
      });

      if (!estadoPostQuirurgico) {
        throw new NotFoundException('No se encontró la cirugia');
      }

      await this.tblEstadoPostQuirurjico.save(estadoPostQuirurgico);

      return this.omitirCampos(estadoPostQuirurgico);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const estadoPostQuirurgico = await this.findOneById(id);
      await this.tblEstadoPostQuirurjico.update(estadoPostQuirurgico.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'Se eliminó el estado post quirurgico' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const estadoPostQuirurgico = await this.findOneById(id, true);
      await this.tblEstadoPostQuirurjico.update(estadoPostQuirurgico.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'Se restauró el estado post quirurgico' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(estadoPostQuirurgico: EstadoPostquirurgico) {
    delete estadoPostQuirurgico?.activo;
    delete estadoPostQuirurgico?.deletedAt;
    delete estadoPostQuirurgico?.cirugia?.activo;
    delete estadoPostQuirurgico?.cirugia?.deletedAt;

    return estadoPostQuirurgico;
  }

  private camposVisibles(estadosPostsQuirurgicos: EstadoPostquirurgico[]) {
    return estadosPostsQuirurgicos.map((estadoPostQuirurgico) => this.omitirCampos(estadoPostQuirurgico));
  }
}
