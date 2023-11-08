import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateEndodonciaDto } from './dto/create-endodoncia.dto';
import { UpdateEndodonciaDto } from './dto/update-endodoncia.dto';
import { Endodoncia } from './entities/endodoncia.entity';

@Injectable()
export class EndodonciaService {
  constructor(
    @InjectRepository(Endodoncia)
    private readonly tblEndodoncia: Repository<Endodoncia>,

    @InjectRepository(Paciente)
    private readonly tblPaciente: Repository<Paciente>,
  ) {}

  async registrarEndodoncia(createEndodonciaDto: CreateEndodonciaDto) {
    try {
      const paciente = await this.tblPaciente.findOne({
        where: { id: createEndodonciaDto.PacienteId },
      });

      if (!paciente) {
        throw new NotFoundException('El paciente no existe en la base de datos asdadasda');
      }

      const endodoncia = this.tblEndodoncia.create({
        ...createEndodonciaDto,
        paciente: paciente,
      });

      await this.tblEndodoncia.save(endodoncia);

      return this.omitirCampos(endodoncia);
    } catch (error) {
      throw error;
    }
  }

  async obtenerEndodoncias() {
    try {
      const endodoncias = await this.tblEndodoncia.find({
        relations: ['paciente'],
      });
      return this.camposVisibles(endodoncias);
    } catch (error) {
      throw error;
    }
  }

  async obtenerEndodonciasEliminadas() {
    try {
      const endodoncias = await this.tblEndodoncia.find({
        relations: ['paciente'],
        withDeleted: true,
        where: { activo: false },
      });
      return this.camposVisibles(endodoncias);
    } catch (error) {
      throw error;
    }
  }

  async buscarEndodonciaPorId(id: number, checkDeleted: boolean = false) {
    try {
      const endodoncia = await this.tblEndodoncia.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!endodoncia) {
        throw new NotFoundException('No existe la endodoncia solicitada');
      }

      if (endodoncia.deletedAt && !checkDeleted) {
        throw new BadRequestException('La endodoncia fue eliminado anteriormente');
      }

      if (!endodoncia.deletedAt && checkDeleted) {
        throw new BadRequestException('No se puede restaurar una endodoncia que no ha sido eliminado');
      }

      return this.omitirCampos(endodoncia);
    } catch (error) {
      throw error;
    }
  }

  async actualizarEndodoncia(id: number, updateEndodonciaDto: UpdateEndodonciaDto) {
    try {
      const endodoncia = await this.tblEndodoncia.preload({
        id,
        ...updateEndodonciaDto,
      });

      if (!endodoncia) {
        throw new NotFoundException('La endodoncia no existe');
      }

      await this.tblEndodoncia.save(endodoncia);

      return this.omitirCampos(endodoncia);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async eliminarEndodoncia(id: number) {
    try {
      const endodoncia = await this.buscarEndodonciaPorId(id);
      await this.tblEndodoncia.update(endodoncia.id, {
        deletedAt: new Date(),
        activo: false,
      });
      return { message: `La endoconcia con el id ${id} fue eliminado correctamente` };
    } catch (error) {
      throw error;
    }
  }

  async restaurarEndodoncia(id: number) {
    try {
      const endodoncia = await this.buscarEndodonciaPorId(id, true);
      await this.tblEndodoncia.update(endodoncia.id, {
        deletedAt: null,
        activo: true,
      });

      return {
        message: 'La endodoncia fue restaurado correctamente',
      };
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(endodoncia: Endodoncia) {
    delete endodoncia?.activo;
    delete endodoncia?.deletedAt;
    delete endodoncia?.paciente?.activo;
    delete endodoncia?.paciente?.deletedAt;

    return endodoncia;
  }

  private camposVisibles(endodoncias: Endodoncia[]) {
    return endodoncias.map((endodoncia) => this.omitirCampos(endodoncia));
  }
}
