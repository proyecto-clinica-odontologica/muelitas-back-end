import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateEndodonciaDto } from './dto/create-endodoncia.dto';
import { UpdateEndodonciaDto } from './dto/update-endodoncia.dto';
import { Endodoncia } from './entities/endodoncia.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EndodonciaService {

  constructor(
    @InjectRepository(Endodoncia)
    private dbEndodoncia: Repository<Endodoncia>,

    // private  dbPaciente: PacienteService,

  ) { }

  async create(EndodonciaId: number, createEndodonciaDto: CreateEndodonciaDto) {

    try {
      // const Paciente = await this.dbPaciente.findOne(PacienteId);
      const Endodoncia = this.dbEndodoncia.create(CreateEndodonciaDto);
      // Endodoncia.Paciente = Paciente;
      return await this.dbEndodoncia.save(Endodoncia);
    } catch (error) {
      throw error;
    }
  }



  async findAll() {
    try {
      return await this.dbEndodoncia.find({ relations: ['Paciente'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    let endodoncia: Endodoncia;
    try {
      if (isNaN(+id)) {
        endodoncia = await this.dbEndodoncia.findOneBy({ EndodonciaId: +id });
      }

      if (!endodoncia) {
        throw new NotFoundException(
          `no existe una endodoncia con el id ${id} en la base de datos`,
        );
      }

      return endodoncia;
    } catch (error) {
      throw error;
    }
  }

  async update(EndodonciaId: number, updateEndodonciaDto: UpdateEndodonciaDto) {
    try {
      const endodoncia = await this.dbEndodoncia.preload({
        EndodonciaId,
        ...updateEndodonciaDto,
      });
      if (!endodoncia) {
        throw new BadRequestException('No existe el docente que desea actualizar');
      }
      return await this.dbEndodoncia.save(endodoncia);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const endodoncia = await this.findOne(id);
      await this.dbEndodoncia.remove(endodoncia);
      return {
        message: `la interpretacion con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}


