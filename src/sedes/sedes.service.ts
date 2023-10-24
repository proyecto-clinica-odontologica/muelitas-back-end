import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { Sede } from './entities/sede.entity';

@Injectable()
export class SedesService {
  constructor(
    @InjectRepository(Sede)
    private readonly dbSede: Repository<Sede>,

    @InjectRepository(Empresa)
    private readonly dbEmpresa: Repository<Empresa>,

    private readonly dataSource: DataSource,
  ) {}

  async registrarSede(createSedeDto: CreateSedeDto) {
    try {
      const empresa = await this.dbEmpresa.findOne({
        where: { id: createSedeDto.idEmpresa },
      });

      if (!empresa) {
        throw new NotFoundException(
          'no se encuentra la empresa registrada en la base de datos',
        );
      }

      const sede = this.dbSede.create({
        ...createSedeDto,
        empresa: empresa,
      });

      const sedeCreada = await this.dbSede.save(sede);
      return sedeCreada.empresa;
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException(
          'El celular o el correo ya existe en la base de datos',
        );
      }
      throw error;
    }
  }

  async obtenerSedes() {
    try {
      return await this.dbSede.find();
    } catch (error) {
      throw error;
    }
  }

  async obtenerSedesEliminadas() {
    try {
      return await this.dbSede.find({
        withDeleted: true,
        where: { activo: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarSedePorId(id: number) {
    try {
      const sede = await this.dbSede.findOne({
        where: { id },
        relations: ['empresa'],
      });
      if (!sede) {
        throw new NotFoundException(`La sede con el id ${id} no existe`);
      }

      delete sede.activo;
      delete sede.deletedAt;
      delete sede.empresa.deletedAt;
      delete sede.empresa.activo;
      delete sede.empresa.sede;
      delete sede.empresa.id;

      return sede;
    } catch (error) {
      throw error;
    }
  }

  async buscarSedePorNombre(nombreSede: string) {
    try {
      const sede = await this.dbSede.findOne({
        where: { Nombre: nombreSede },
        relations: ['empresa'],
      });
      if (!sede) {
        throw new NotFoundException(`La sede ${nombreSede} no existe`);
      }

      delete sede.activo;
      delete sede.deletedAt;
      delete sede.empresa.deletedAt;
      delete sede.empresa.activo;
      delete sede.empresa.sede;
      delete sede.empresa.id;

      return sede;
    } catch (error) {
      throw error;
    }
  }

  async buscarSedesPorEmpresa(idEmpresa: number) {
    try {
      const empresa = await this.dbEmpresa.findOne({
        where: { id: idEmpresa },
        relations: ['sede'],
      });

      if (!empresa) {
        throw new NotFoundException(`La empresa ${idEmpresa} no existe`);
      }

      return empresa.sede;
    } catch (error) {
      throw error;
    }
  }

  async actualizarSede(id: number, updateSedeDto: UpdateSedeDto) {
    try {
      const sedes = await this.dbSede.preload({
        id,
        ...updateSedeDto,
      });
      if (!sedes) {
        throw new BadRequestException(`La sede con el id ${id} no existe`);
      }
      return this.dbSede.save(sedes);
    } catch (error) {
      throw error;
    }
  }

  async eliminarSede(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sede = await this.dbSede.findOne({
        where: { id },
        relations: ['empresa'],
      });
      if (!sede) {
        throw new NotFoundException(`La sede con el id ${id} no existe`);
      }
      if (!sede.empresa) {
        throw new NotFoundException(`La empresa no existe`);
      }

      sede.activo = false;
      sede.empresa.activo = false;

      await queryRunner.manager.save([sede, sede.empresa]);
      await queryRunner.manager.softDelete(Sede, id);
      await queryRunner.manager.softDelete(Empresa, sede.empresa.id);
      await queryRunner.commitTransaction();

      return { message: 'Sede eliminada' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async restaurarSede(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sede = await this.dbSede.findOne({
        where: { id },
        withDeleted: true,
        relations: ['empresa'],
      });

      if (!sede) {
        throw new NotFoundException(`La sede con el id ${id} no existe`);
      }
      if (!sede.empresa) {
        throw new NotFoundException(`La empresa con el id ${id} no existe`);
      }

      sede.deletedAt = null;
      sede.empresa.deletedAt = null;

      sede.activo = true;
      sede.empresa.activo = true;

      await queryRunner.manager.save([sede, sede.empresa]);
      await queryRunner.commitTransaction();

      return { message: 'Sede restaurada' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
