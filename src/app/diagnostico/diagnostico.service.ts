import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dto/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';

@Injectable()
export class DiagnosticoService {
    constructor(
      @InjectRepository(Diagnostico) 
      private diagnosticoRepository: Repository<Diagnostico>){}

  async createDiagnostico(diagnosticoDto: CreateDiagnosticoDto){
    try {
      const diagnostico = this.diagnosticoRepository.create({
        ...diagnosticoDto,
      });
      return await this.diagnosticoRepository.save(diagnostico);
    } catch (error) {
      throw error;
    }
  }
  getListDiagnostico(){
    return this.diagnosticoRepository.find()
  }
  async getDiagnostico(id: number){
    const diagnosticoFound = await this.diagnosticoRepository.findOne({
      where: {
        id
      }
    })
    if(!diagnosticoFound){
        return new HttpException('Diagnostico no encontrado', HttpStatus.NOT_FOUND)
    }
    return diagnosticoFound
  }

  async deleteDiagnostico(id: number){
    const result = await this.diagnosticoRepository.delete({ id })
     if(result.affected === 0){
        return new HttpException('Diagnostico no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateDiagnostico(id: number, diagnosticoDto: UpdateDiagnosticoDto){
    try {
      const diagnostico = await this.diagnosticoRepository.findOne({
        where: { id }
      });
    
      if (!diagnostico) {
        throw new NotFoundException('Diagnostico no encontrada en la base de datos');
      }
      diagnostico.Tipo = diagnosticoDto.Tipo;
      diagnostico.Version = diagnosticoDto.Version;
      diagnostico.Codigo = diagnosticoDto.Codigo;
      diagnostico.Resumen = diagnosticoDto.Resumen;
      diagnostico.Detalle = diagnosticoDto.Detalle;
      
      await this.diagnosticoRepository.save(diagnostico);
      return diagnostico;
    } catch (error) {
      throw error;
    }
  }
  async getdiagnosticoByCodigo(Codigo: number) {
      try {
        const codigo = await this.diagnosticoRepository.findOne({
          where: { Codigo },
        });
  
        if (!codigo) {
          throw new NotFoundException('Codigo no encontrado en la base de datos');
        }
        const diagnostico = await this.diagnosticoRepository.find({
          where: {
            Codigo: Codigo
          },
        });
        return diagnostico;
      } catch (error) {
        throw error;
      }
    }
}