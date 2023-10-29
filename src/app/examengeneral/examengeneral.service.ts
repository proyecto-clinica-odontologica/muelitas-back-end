import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamengeneralDto } from './dto/create-examengeneral.dto';
import { UpdateExamengeneralDto } from './dto/update-examengeneral.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamenGeneral } from './entities/examengeneral.entity';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';

@Injectable()
export class ExamengeneralService {
  constructor(
    @InjectRepository(ExamenGeneral) 
    private examenesGenRepository: Repository<ExamenGeneral>,
    @InjectRepository(Paciente) 
    private readonly pacienteRepository: Repository<Paciente>){}

  async createexamenesGen(examenesGenDto: CreateExamengeneralDto){
    try {
      const paciente = await this.pacienteRepository.findOne({
        where: { id: examenesGenDto.IdPaciente },
      });
      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado en la base de datos');
      }
      const examenesGen = this.examenesGenRepository.create({
        ...examenesGenDto,
        paciente,
      });
      return await this.examenesGenRepository.save(examenesGen);
    } catch (error) {
      throw error;
    }
  }
  getListexamenesGen(){
    return this.examenesGenRepository.find()
  }
  async getexamenesGen(id: number){
    const examenesGenFound = await this.examenesGenRepository.findOne({
      where: {
        id
      }
    })
    if(!examenesGenFound){
        return new HttpException('Examenes general no encontrado', HttpStatus.NOT_FOUND)
    }
    return examenesGenFound
  }

  async deleteexamenesGen(id: number){
    const result = await this.examenesGenRepository.delete({ id })
     if(result.affected === 0){
        return new HttpException('Examenes general no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateexamenesGen(id: number, examenesGenDto: UpdateExamengeneralDto){
    try {
      const examenesGen = await this.examenesGenRepository.findOne({
        where: { paciente: { id } },
        relations: ['paciente'],
      });
    
      if (!examenesGen) {
        throw new NotFoundException('Examen general no encontrada en la base de datos');
      }
    
      Object.assign(examenesGen, examenesGenDto);
    
      return await this.examenesGenRepository.save(examenesGen);
    } catch (error) {
      throw error;
    }
  }
  async getexamenesGenByPaciente(id: number) {
      try {
        const paciente = await this.pacienteRepository.findOne({
          where: { id },
        });
  
        if (!paciente) {
          throw new NotFoundException('Paciente no encontrado en la base de datos');
        }
        const examenesGen = await this.examenesGenRepository.findOne({
          where: {
            paciente: {
              id,
            },
          },
        });
  
        if (!examenesGen) {
          throw new NotFoundException('Examenes general no encontrada en la base de datos');
        }
        return examenesGen;
      } catch (error) {
        throw error;
      }
    }
}
