import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotasEvolutivaDto } from './dto/create-notas-evolutiva.dto';
import { UpdateNotasEvolutivaDto } from './dto/update-notas-evolutiva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotasEvolutiva } from './entities/notas-evolutiva.entity';
import { Repository } from 'typeorm/repository/Repository';
// import { PacienteService } from 'src/paciente/paciente.service';

@Injectable()
export class NotasEvolutivasService {

  constructor(
    @InjectRepository(NotasEvolutiva)
    private bdNotasEvolutiva: Repository<NotasEvolutiva>,

    // private  dbPaciente: PacienteService,

  ) {}

  async create(PacienteId:number,createNotasEvolutivaDto: CreateNotasEvolutivaDto) {
    try {
      // const Paciente = await this.dbPaciente.findOne(PacienteId);
      const NotasEvolutiva = this.bdNotasEvolutiva.create(createNotasEvolutivaDto);
      // NotasEvolutiva.Paciente = Paciente;
      return await this.bdNotasEvolutiva.save(NotasEvolutiva);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.bdNotasEvolutiva.find({ relations: ['Paciente'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    let notasEvolutiva: NotasEvolutiva;
    try {
      if (isNaN(+id)) {
        notasEvolutiva = await this.bdNotasEvolutiva.findOneBy({ Tratamiento: id });
      }
      else {
        notasEvolutiva = await this.bdNotasEvolutiva.findOneBy({ IdNotasEvolutivas: +id });
      } 

      if (!notasEvolutiva) {
        throw new NotFoundException(
          `no existe una nota evolutiva con el id ${id} en la base de datos`,
        );
      }

      return notasEvolutiva;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateNotasEvolutivaDto: UpdateNotasEvolutivaDto) {
    updateNotasEvolutivaDto.Fecha = updateNotasEvolutivaDto.Fecha;
    updateNotasEvolutivaDto.Tratamiento = updateNotasEvolutivaDto.Tratamiento?.toLowerCase();
    updateNotasEvolutivaDto.Firma = updateNotasEvolutivaDto.Firma?.toLowerCase();
    // updateNotasEvolutivaDto.PacienteId = updateNotasEvolutivaDto.PacienteId?;
  

    try {
      const notasEvolutiva = await this.bdNotasEvolutiva.preload({
        IdNotasEvolutivas: id,
        ...updateNotasEvolutivaDto,
      });
      await this.bdNotasEvolutiva.save(notasEvolutiva);
      return notasEvolutiva;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const notasEvolutiva = await this.findOne(id);
      await this.bdNotasEvolutiva.remove(notasEvolutiva);
      return {
        message: `la nota evolutiva con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
