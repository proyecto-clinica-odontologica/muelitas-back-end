import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnivelPiezaDto } from './dto/create-anivel-pieza.dto';
import { UpdateAnivelPiezaDto } from './dto/update-anivel-pieza.dto';
import { AnivelPieza } from './entities/anivel-pieza.entity';

@Injectable()
export class AnivelPiezaService {
  constructor(
    @InjectRepository(AnivelPieza)
    private readonly tblAnivelPieza: Repository<AnivelPieza>,
  ) {}

  async crearNivelPieza(createAnivelPiezaDto: CreateAnivelPiezaDto) {
    try {
      const nivelPieza = this.tblAnivelPieza.create(createAnivelPiezaDto);
      await this.tblAnivelPieza.save(nivelPieza);

      return this.omitirCampos(nivelPieza);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el nivel de pieza');
    }
  }

  async obtenerNivelesDePiezas() {
    try {
      return await this.tblAnivelPieza.find({
        where: { activo: true },
        select: [
          'id',
          'ColorEritemosa',
          'ColorNormal',
          'ColorPalido',
          'ConsistenaciaNormal',
          'ConsistenciaEdematosa',
          'ConsistenciaFibrosa',
          'Encia',
          'EnciaFaltaoAusencia',
          'EnciaInconsistencia',
          'EnciaNormal',
          'EnciaPapilarAplanada',
          'EnciaPapilarCrateriforme',
          'EnciaPapilarNormal',
          'TexturaLisa',
          'TexturaNormal',
          'TexturaRugosa',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerNivelesDePiezasEliminadas() {
    try {
      return await this.tblAnivelPieza.find({
        where: { activo: false },
        select: [
          'id',
          'ColorEritemosa',
          'ColorNormal',
          'ColorPalido',
          'ConsistenaciaNormal',
          'ConsistenciaEdematosa',
          'ConsistenciaFibrosa',
          'Encia',
          'EnciaFaltaoAusencia',
          'EnciaInconsistencia',
          'EnciaNormal',
          'EnciaPapilarAplanada',
          'EnciaPapilarCrateriforme',
          'EnciaPapilarNormal',
          'TexturaLisa',
          'TexturaNormal',
          'TexturaRugosa',
        ],
        withDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async buscarNivelPiezaPorId(id: number) {
    try {
      const nivelPieza = await this.tblAnivelPieza.findOneOrFail({
        where: { id, activo: true },
        select: [
          'id',
          'ColorEritemosa',
          'ColorNormal',
          'ColorPalido',
          'ConsistenaciaNormal',
          'ConsistenciaEdematosa',
          'ConsistenciaFibrosa',
          'Encia',
          'EnciaFaltaoAusencia',
          'EnciaInconsistencia',
          'EnciaNormal',
          'EnciaPapilarAplanada',
          'EnciaPapilarCrateriforme',
          'EnciaPapilarNormal',
          'TexturaLisa',
          'TexturaNormal',
          'TexturaRugosa',
        ],
      });
      return nivelPieza;
    } catch (error) {
      throw new NotFoundException('No se encontró el nivel de pieza');
    }
  }

  async actualizarNivelPieza(id: number, updateAnivelPiezaDto: UpdateAnivelPiezaDto) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async eliminarNivelPieza(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async restaurarNivelPieza(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  private omitirCampos(entidad: Partial<AnivelPieza>): Partial<AnivelPieza> {
    const { deletedAt, activo, ...resto } = entidad;
    return resto;
  }
}
