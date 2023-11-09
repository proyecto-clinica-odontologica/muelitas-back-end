import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dto/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';

@Injectable()
export class DiagnosticosService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly tbldiagnostico: Repository<Diagnostico>,
  ) {}

  async create(createDiagnosticoDto: CreateDiagnosticoDto) {
    try {
      const diagnostico = this.tbldiagnostico.create(createDiagnosticoDto);
      await this.tbldiagnostico.save(diagnostico);
      return this.omitirCampos(diagnostico);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const diagnosticos = await this.tbldiagnostico.find();
      return this.camposVisibles(diagnosticos);
    } catch (error) {
      throw error;
    }
  }

  async findAllDeleted() {
    try {
      const diagnosticos = await this.tbldiagnostico.find({
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(diagnosticos);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, checkDeleted: boolean = false) {
    try {
      const diagnostico = await this.tbldiagnostico.findOne({
        where: { id },
        withDeleted: checkDeleted,
      });

      if (!diagnostico) {
        throw new NotFoundException('No se encontró el diagnostico');
      }

      if (!diagnostico.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar un diagnostico que no está eliminado');
      }

      if (diagnostico.deletedAt && !checkDeleted) {
        throw new BadRequestException('el diagnostico fue eliminado anteriormente');
      }

      return this.omitirCampos(diagnostico);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateDiagnosticoDto: UpdateDiagnosticoDto) {
    try {
      const diagnostico = await this.tbldiagnostico.preload({
        id,
        ...updateDiagnosticoDto,
      });

      if (!diagnostico) {
        throw new NotFoundException('No se encontró el diagnostico');
      }

      await this.tbldiagnostico.save(diagnostico);

      return this.omitirCampos(diagnostico);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const diagnostico = await this.findOneById(id);
      await this.tbldiagnostico.update(diagnostico.id, {
        activo: false,
        deletedAt: new Date(),
      });
      return { message: 'El Diagnostico eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async restore(id: number) {
    try {
      const diagnostico = await this.findOneById(id, true);
      await this.tbldiagnostico.update(diagnostico.id, {
        activo: true,
        deletedAt: null,
      });
      return { message: 'El Diagnostico fue restaurado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(diagnostico: Diagnostico) {
    delete diagnostico?.activo;
    delete diagnostico?.deletedAt;

    return diagnostico;
  }

  private camposVisibles(diagnosticos: Diagnostico[]) {
    return diagnosticos.map((diagnostico) => this.omitirCampos(diagnostico));
  }
}
