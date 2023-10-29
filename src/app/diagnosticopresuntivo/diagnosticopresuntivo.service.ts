import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiagnosticopresuntivoDto } from './dto/create-diagnosticopresuntivo.dto';
import { UpdateDiagnosticopresuntivoDto } from './dto/update-diagnosticopresuntivo.dto';
import { Diagnosticopresuntivo } from './entities/diagnosticopresuntivo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosticopresuntivoService {
  constructor(
    @InjectRepository(Diagnosticopresuntivo) 
    private diagpresunRepository: Repository<Diagnosticopresuntivo>,
    @InjectRepository(Paciente) 
    private readonly pacienteRepository: Repository<Paciente>){}

  async createDiagPresun(diagpresunDto: CreateDiagnosticopresuntivoDto){
    try {
      const paciente = await this.pacienteRepository.findOne({
        where: { id: diagpresunDto.IdPaciente },
      });
      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado en la base de datos');
      }
      const DiagPresun = this.diagpresunRepository.create({
        ...diagpresunDto,
        paciente,
      });
      return await this.diagpresunRepository.save(DiagPresun);
    } catch (error) {
      throw error;
    }
  }
  getListDiagPresun(){
    return this.diagpresunRepository.find()
  }
  async getDiagPresun(id: number){
    const DiagPresunFound = await this.diagpresunRepository.findOne({
      where: {
        id
      }
    })
    if(!DiagPresunFound){
        return new HttpException('Diagnostico presuntivo no encontrado', HttpStatus.NOT_FOUND)
    }
    return DiagPresunFound
  }

  async deleteDiagPresun(id: number){
    const result = await this.diagpresunRepository.delete({ id })
     if(result.affected === 0){
        return new HttpException('Diagnostico presuntivo no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateDiagPresun(id: number, DiagPresunDto: UpdateDiagnosticopresuntivoDto){
    try {
      const diagpresun = await this.diagpresunRepository.findOne({
        where: { id }
      });
    
      if (!diagpresun) {
        throw new NotFoundException('Diagnostico presuntivo no encontrada en la base de datos');
      }

      const paciente = await this.pacienteRepository.findOne({
        where: { id: DiagPresunDto.IdPaciente },
      });

      if (!paciente) {
        throw new NotFoundException('Paciente no encontrada en la base de datos');
      }
      diagpresun.Diagnostico = DiagPresunDto.Diagnostico;
      if (DiagPresunDto.IdPaciente) {
        diagpresun.paciente = paciente;
      }
      
      await this.diagpresunRepository.save(diagpresun);
      return diagpresun;
    } catch (error) {
      throw error;
    }
  }
  async getDiagPresunByPaciente(id: number) {
      try {
        const paciente = await this.pacienteRepository.findOne({
          where: { id },
        });
  
        if (!paciente) {
          throw new NotFoundException('Paciente no encontrado en la base de datos');
        }
        const DiagPresun = await this.diagpresunRepository.findOne({
          where: {
            paciente: {
              id,
            },
          },
        });
  
        if (!DiagPresun) {
          throw new NotFoundException('Diagnostico presuntivo no encontrada en la base de datos');
        }
        return DiagPresun;
      } catch (error) {
        throw error;
      }
    }
}
