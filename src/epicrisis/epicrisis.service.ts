import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpicrisisDto } from './dto/create-epicrisis.dto';
import { UpdateEpicrisisDto } from './dto/update-epicrisis.dto';
import { Epicrisis } from './entities/epicrisis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
// import { PacienteService } from 'src/paciente/paciente.service';


@Injectable()
export class EpicrisisService {

  constructor(
    @InjectRepository(Epicrisis)
    private dbEpicrisis: Repository<Epicrisis>,

    // private  dbPaciente: PacienteService,

  ) { }


  async create(PacienteId: number, createEpicrisisDto: CreateEpicrisisDto) {
    try {
      // const Paciente = await this.dbPaciente.findOne(PacienteId);
      const Epicrisis = this.dbEpicrisis.create(createEpicrisisDto);
      // Epicrisis.Paciente = Paciente;
      return await this.dbEpicrisis.save(Epicrisis);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbEpicrisis.find({ relations: ['Paciente'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    let epicrisis: Epicrisis;
    try {
      if (isNaN(+id)) {
        epicrisis = await this.dbEpicrisis.findOneBy({ Contenido: id });
      } else {
        epicrisis = await this.dbEpicrisis.findOneBy({ IdEpicrisis: +id });
      }

      if (!epicrisis) {
        throw new NotFoundException(
          `no existe una epicrisis con el id ${id} en la base de datos`,
        );
      }

      return epicrisis;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateEpicrisisDto: UpdateEpicrisisDto) {
    updateEpicrisisDto.Contenido = updateEpicrisisDto.Contenido?.toLowerCase();
    updateEpicrisisDto.FechaRegistro = updateEpicrisisDto.FechaRegistro;
    // updateEpicrisisDto.PacienteId = updateEpicrisisDto.PacienteId?;
    try {
      const epicrisis = await this.dbEpicrisis.preload({
        IdEpicrisis: id,
        ...updateEpicrisisDto,
      });
      await this.dbEpicrisis.save(epicrisis);
      return epicrisis;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const epicrisis = await this.findOne(id);
      await this.dbEpicrisis.remove(epicrisis);
      return {
        message: `la epicrisis con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
