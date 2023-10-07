import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly dbEmpresa: Repository<Empresa>,
  ) {}
  async registrarEmpresa(createEmpresaDto: CreateEmpresaDto) {
    try {
      const empresa = this.dbEmpresa.create(createEmpresaDto);
      return await this.dbEmpresa.save(empresa);
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('El RUC o la Razon social ya existe');
      }
      throw error;
    }
  }

  async obtenerEmpresas() {
    try {
      return this.dbEmpresa.find();
    } catch (error) {
      throw error;
    }
  }

  async buscarUnaEmpresa(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async actualizarEmpresa(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    try {
      const empresa = await this.dbEmpresa.preload({
        id,
        ...updateEmpresaDto,
      });
      if (!empresa) {
        throw new NotFoundException('Empresa no encontrada');
      }
      return await this.dbEmpresa.save(empresa);
    } catch (error) {
      throw error;
    }
  }

  async eliminarEmpresa(id: number) {
    try {
      const empresa = await this.dbEmpresa.preload({
        id,
        activo: false,
      });
      if (!empresa) {
        throw new NotFoundException('Empresa no encontrada');
      }
      await this.dbEmpresa.save(empresa);
      await this.dbEmpresa.softDelete(id);
      return { message: `Empresa con el id ${id} fue eliminada` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarEmpresa(id: number) {
    try {
      await this.dbEmpresa.restore(id);
      const empresa = await this.dbEmpresa.preload({
        id,
        activo: true,
      });

      if (!empresa) {
        throw new NotFoundException('Empresa no encontrada');
      }

      await this.dbEmpresa.save(empresa);
    } catch (error) {
      throw error;
    }
  }
}
