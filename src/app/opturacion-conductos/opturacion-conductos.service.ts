import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endodoncia } from '../endodoncia/entities/endodoncia.entity';
import { CreateOpturacionConductoDto } from './dto/create-opturacion-conducto.dto';
import { UpdateOpturacionConductoDto } from './dto/update-opturacion-conducto.dto';
import { OpturacionConducto } from './entities/opturacion-conducto.entity';

@Injectable()
export class OpturacionConductosService {
  constructor(
    @InjectRepository(OpturacionConducto)
    private readonly tblOpturacionConducto: Repository<OpturacionConducto>,

    @InjectRepository(Endodoncia)
    private readonly tblEndodoncia: Repository<Endodoncia>,
  ) {}

  async registrarOpturacionDeConducto(createOpturacionConductoDto: CreateOpturacionConductoDto) {
    try {
      const endodoncia = await this.tblEndodoncia.findOne({
        where: { id: createOpturacionConductoDto.EndodonciaId },
      });

      if (!endodoncia) {
        throw new NotFoundException('La endodoncia no existe en la base de datos');
      }

      const opturacionConducto = this.tblOpturacionConducto.create({
        ...createOpturacionConductoDto,
        endodoncia: endodoncia,
      });

      await this.tblOpturacionConducto.save(opturacionConducto);

      return this.omitirCampos(opturacionConducto);
    } catch (error) {
      throw error;
    }
  }

  async obtenerOpturacionesDeConductos() {
    try {
      const opturacionesConductos = await this.tblOpturacionConducto.find({
        relations: ['endodoncia'],
      });

      return this.camposVisibles(opturacionesConductos);
    } catch (error) {
      throw error;
    }
  }

  async obtenerOpturacionesDeConductosEliminados() {
    try {
      const opturacionesConductos = await this.tblOpturacionConducto.find({
        relations: ['endodoncia'],
        withDeleted: true,
        where: { activo: false },
      });

      return this.camposVisibles(opturacionesConductos);
    } catch (error) {
      throw error;
    }
  }

  async buscarOpturacionDeConductoPorId(id: number, checkDeleted: boolean = false) {
    try {
      const opturacionConducto = await this.tblOpturacionConducto.findOne({
        where: { id },
        withDeleted: checkDeleted,
      });

      if (!opturacionConducto) {
        throw new NotFoundException('La opturacion de conducto no existe en la base de datos');
      }

      if (opturacionConducto.deletedAt && !checkDeleted) {
        throw new NotFoundException('La opturacion de conducto fue eliminado anteriormente');
      }

      if (!opturacionConducto.deletedAt && checkDeleted) {
        throw new NotFoundException('No se puede restaurar la opturacion de conducto porque no ha sido eliminado');
      }

      return this.omitirCampos(opturacionConducto);
    } catch (error) {
      throw error;
    }
  }

  async actualizarOpturacionDeConducto(id: number, updateOpturacionConductoDto: UpdateOpturacionConductoDto) {
    try {
      const opturacionConducto = await this.tblOpturacionConducto.preload({
        id,
        ...updateOpturacionConductoDto,
      });

      if (!opturacionConducto) {
        throw new NotFoundException('La opturacion de conducto no existe en la base de datos');
      }

      await this.tblOpturacionConducto.save(opturacionConducto);

      return this.omitirCampos(opturacionConducto);
    } catch (error) {
      throw error;
    }
  }

  async eliminarOpturacionDeConducto(id: number) {
    try {
      const opturacionConducto = await this.buscarOpturacionDeConductoPorId(id);
      await this.tblOpturacionConducto.update(opturacionConducto.id, {
        activo: false,
        deletedAt: new Date(),
      });

      return { message: 'La opturacion de conducto fue eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restaurarOpturacionDeConducto(id: number) {
    try {
      const opturacionConducto = await this.buscarOpturacionDeConductoPorId(id, true);
      await this.tblOpturacionConducto.update(opturacionConducto.id, {
        activo: true,
        deletedAt: null,
      });

      return { message: 'La opturacion de conducto fue restaurado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(opturacionConducto: OpturacionConducto) {
    delete opturacionConducto?.activo;
    delete opturacionConducto?.deletedAt;
    delete opturacionConducto?.endodoncia?.activo;
    delete opturacionConducto?.endodoncia?.deletedAt;

    return opturacionConducto;
  }

  private camposVisibles(opturacionesConductos: OpturacionConducto[]) {
    return opturacionesConductos.map((opturacionConducto) => this.omitirCampos(opturacionConducto));
  }
}
