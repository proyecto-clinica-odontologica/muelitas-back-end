import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anamnesis } from './entities/anamnesis.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';
import { Paciente } from '../paciente/entities/paciente.entity';

@Injectable()
export class AnamnesisService {

  constructor(
      @InjectRepository(Anamnesis) 
      private anamnesisRepository: Repository<Anamnesis>,
      @InjectRepository(Paciente) 
      private readonly pacienteRepository: Repository<Paciente>){}

    async createAnamnesis(anamnesisDto: CreateAnamnesisDto){
      try {
        const paciente = await this.pacienteRepository.findOne({
          where: { id: anamnesisDto.IdPaciente },
        });
        if (!paciente) {
          throw new NotFoundException('Paciente no encontrado en la base de datos');
        }
        const anamnesis = this.anamnesisRepository.create({
          ...anamnesisDto,
          paciente,
        });
        return await this.anamnesisRepository.save(anamnesis);
      } catch (error) {
        throw error;
      }
    }
    getListAnamnesis(){
      return this.anamnesisRepository.find()
    }
    async getAnamnesis(id: number){
      const anamnesisFound = await this.anamnesisRepository.findOne({
        where: {
          id
        }
      })
      if(!anamnesisFound){
          return new HttpException('Anamnesis no encontrado', HttpStatus.NOT_FOUND)
      }
      return anamnesisFound
    }

    async deleteAnamnesis(id: number){
      const result = await this.anamnesisRepository.delete({ id })
       if(result.affected === 0){
          return new HttpException('Anamnesis no encontrado', HttpStatus.NOT_FOUND)
      }
      return result
    }

    async updateAnamnesis(id: number, anamnesisDto: UpdateAnamnesisDto){
      try {
        const anamnesis = await this.anamnesisRepository.findOne({
          where: { id }
        });
      
        if (!anamnesis) {
          throw new NotFoundException('Anamnesis no encontrada en la base de datos');
        }

        const paciente = await this.pacienteRepository.findOne({
          where: { id: anamnesisDto.IdPaciente },
        });

        if (!paciente) {
          throw new NotFoundException('Paciente no encontrada en la base de datos');
        }
        anamnesis.Contenido = anamnesisDto.Contenido;
        if (anamnesisDto.IdPaciente) {
          anamnesis.paciente = paciente;
        }
        
        await this.anamnesisRepository.save(anamnesis);
        return anamnesis;
      } catch (error) {
        throw error;
      }
    }
    async getAnamnesisByPaciente(id: number) {
        try {
          const paciente = await this.pacienteRepository.findOne({
            where: { id },
          });
    
          if (!paciente) {
            throw new NotFoundException('Paciente no encontrado en la base de datos');
          }
          const anamnesis = await this.anamnesisRepository.findOne({
            where: {
              paciente: {
                id,
              },
            },
          });
    
          if (!anamnesis) {
            throw new NotFoundException('Anamnesis no encontrada en la base de datos');
          }
          return anamnesis;
        } catch (error) {
          throw error;
        }
      }

}
