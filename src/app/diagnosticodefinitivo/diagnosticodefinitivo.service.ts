import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiagnosticodefinitivoDto } from './dto/create-diagnosticodefinitivo.dto';
import { UpdateDiagnosticodefinitivoDto } from './dto/update-diagnosticodefinitivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Repository } from 'typeorm';
import { Diagnosticodefinitivo } from './entities/diagnosticodefinitivo.entity';

@Injectable()
export class DiagnosticodefinitivoService {
  constructor(
    @InjectRepository(Diagnosticodefinitivo) 
    private diagdefRepository: Repository<Diagnosticodefinitivo>,
    @InjectRepository(Paciente) 
    private readonly pacienteRepository: Repository<Paciente>){}

  async createDiagdef(diagdefDto: CreateDiagnosticodefinitivoDto){
    try {
      const paciente = await this.pacienteRepository.findOne({
        where: { id: diagdefDto.IdPaciente },
      });
      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado en la base de datos');
      }
      const Diagdef = this.diagdefRepository.create({
        ...diagdefDto,
        paciente,
      });
      return await this.diagdefRepository.save(Diagdef);
    } catch (error) {
      throw error;
    }
  }
  getListDiagdef(){
    return this.diagdefRepository.find()
  }
  async getDiagdef(id: number){
    const diagdefFound = await this.diagdefRepository.findOne({
      where: {
        id
      }
    })
    if(!diagdefFound){
        return new HttpException('Diagnostico definitivo no encontrado', HttpStatus.NOT_FOUND)
    }
    return diagdefFound
  }

  async deleteDiagdef(id: number){
    const result = await this.diagdefRepository.delete({ id })
     if(result.affected === 0){
        return new HttpException('Diagnostico definitivo no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateDiagdef(id: number, diagdefDto: UpdateDiagnosticodefinitivoDto){
    try {
      const Diagdef = await this.diagdefRepository.findOne({
        where: { paciente: { id } },
        relations: ['paciente'],
      });
    
      if (!Diagdef) {
        throw new NotFoundException('Diagnostico definitivo no encontrada en la base de datos');
      }
    
      Object.assign(Diagdef, diagdefDto);
    
      return await this.diagdefRepository.save(Diagdef);
    } catch (error) {
      throw error;
    }
  }
  async getDiagdefByPaciente(id: number) {
      try {
        const paciente = await this.pacienteRepository.findOne({
          where: { id },
        });
  
        if (!paciente) {
          throw new NotFoundException('Paciente no encontrado en la base de datos');
        }
        const diagdef = await this.diagdefRepository.findOne({
          where: {
            paciente: {
              id,
            },
          },
        });
  
        if (!diagdef) {
          throw new NotFoundException('Diagnostico definitivo no encontrada en la base de datos');
        }
        return diagdef;
      } catch (error) {
        throw error;
      }
    }
}
