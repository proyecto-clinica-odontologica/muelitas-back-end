import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamenesauxiliareDto } from './dto/create-examenesauxiliare.dto';
import { UpdateExamenesauxiliareDto } from './dto/update-examenesauxiliare.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Examenesauxiliare } from './entities/examenesauxiliare.entity';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';

@Injectable()
export class ExamenesauxiliaresService {
  constructor(
    @InjectRepository(Examenesauxiliare) 
    private examenesauxRepository: Repository<Examenesauxiliare>,
    @InjectRepository(Paciente) 
    private readonly pacienteRepository: Repository<Paciente>){}

  async createexamenesaux(examenesauxDto: CreateExamenesauxiliareDto){
    try {
      const paciente = await this.pacienteRepository.findOne({
        where: { id: examenesauxDto.IdPaciente },
      });
      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado en la base de datos');
      }
      const examenesaux = this.examenesauxRepository.create({
        ...examenesauxDto,
        paciente,
      });
      return await this.examenesauxRepository.save(examenesaux);
    } catch (error) {
      throw error;
    }
  }
  getListexamenesaux(){
    return this.examenesauxRepository.find()
  }
  async getexamenesaux(id: number){
    const examenesauxFound = await this.examenesauxRepository.findOne({
      where: {
        id
      }
    })
    if(!examenesauxFound){
        return new HttpException('Examen auxiliar no encontrado', HttpStatus.NOT_FOUND)
    }
    return examenesauxFound
  }

  async deleteexamenesaux(id: number){
    const result = await this.examenesauxRepository.delete({ id })
     if(result.affected === 0){
        return new HttpException('Examen auxiliar no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateexamenesaux(id: number, examenesauxDto: UpdateExamenesauxiliareDto){
    try {
      const examenesaux = await this.examenesauxRepository.findOne({
        where: { paciente: { id } },
        relations: ['paciente'],
      });
    
      if (!examenesaux) {
        throw new NotFoundException('Examen auxiliar no encontrada en la base de datos');
      }
    
      Object.assign(examenesaux, examenesauxDto);
    
      return await this.examenesauxRepository.save(examenesaux);
    } catch (error) {
      throw error;
    }
  }
  async getexamenesauxByPaciente(id: number) {
      try {
        const paciente = await this.pacienteRepository.findOne({
          where: { id },
        });
  
        if (!paciente) {
          throw new NotFoundException('Paciente no encontrado en la base de datos');
        }
        const examenesaux = await this.examenesauxRepository.findOne({
          where: {
            paciente: {
              id,
            },
          },
        });
  
        if (!examenesaux) {
          throw new NotFoundException('examenesaux no encontrada en la base de datos');
        }
        return examenesaux;
      } catch (error) {
        throw error;
      }
    }

}
