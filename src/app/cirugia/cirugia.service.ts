import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { Cirugia } from './entities/cirugia.entity';

@Injectable()
export class CirugiaService {
  constructor(
    @InjectRepository(Cirugia)
    private readonly tblCirugia: Repository<Cirugia>,

    @InjectRepository(Paciente)
    private readonly tblPaciente: Repository<Paciente>,
  ) {}

  async create(createCirugiaDto: CreateCirugiaDto) {
    try {
      const paciente = await this.tblPaciente.findOne({ where: { id: createCirugiaDto.PacienteId } });

      if (!paciente) {
        throw new NotFoundException('No se encontró el paciente');
      }

      const cirugia = this.tblCirugia.create({
        ...createCirugiaDto,
        paciente,
      });

      await this.tblCirugia.save(cirugia);

      return this.omitirCampos(cirugia);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const cirugias = await this.tblCirugia.find();
      return this.camposVisibles(cirugias);
    } catch (error) {
      throw error;
    }
  }

  async findAllDelete() {
    try {
      const cirugias = await this.tblCirugia.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(cirugias);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const cirugia = await this.tblCirugia.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!cirugia) throw { message: 'No se encontró la cirugia' };

      if (cirugia.deletedAt && !checkDeleted) {
        throw new BadRequestException('La cirugia fue eliminado anteriormente');
      }

      if (!cirugia.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar una cirugia que no ha sido eliminada');
      }

      return this.omitirCampos(cirugia);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCirugiaDto: UpdateCirugiaDto) {
    try {
      const cirugia = await this.tblCirugia.preload({
        id,
        ...updateCirugiaDto,
      });

      if (!cirugia) {
        throw new NotFoundException('No se encontró la cirugia');
      }

      await this.tblCirugia.save(cirugia);

      return this.omitirCampos(cirugia);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const cirugia = await this.findOneById(id);
      await this.tblCirugia.update(cirugia.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'Se eliminó la cirugia' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const cirugia = await this.findOneById(id, true);
      await this.tblCirugia.update(cirugia.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'Se restauró la cirugia' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(cirugia: Cirugia) {
    delete cirugia?.activo;
    delete cirugia?.deletedAt;
    delete cirugia?.paciente?.activo;
    delete cirugia?.paciente?.deletedAt;

    return cirugia;
  }

  private camposVisibles(cirugias: Cirugia[]) {
    return cirugias.map((cirugia) => this.omitirCampos(cirugia));
  }
}
