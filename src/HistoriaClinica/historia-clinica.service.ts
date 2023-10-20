/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaClinica } from './dto/historia-clinica.entity';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { validate } from 'class-validator';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';


@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private historiaClinicaRepository: Repository<HistoriaClinica>
  ) {}

  async createHistoriaClinica(historiaClinica: CreateHistoriaClinicaDto) {
    const errors = await validate(historiaClinica);
  
    if (errors.length > 0) {
        throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
  
    const newHistoriaClinica = new HistoriaClinica();
    newHistoriaClinica.motivoConsulta = historiaClinica.motivoConsulta;
    newHistoriaClinica.enfermedadActual = historiaClinica.enfermedadActual;
    newHistoriaClinica.presionArterial = parseFloat(historiaClinica.presionArterial);
    newHistoriaClinica.frecuenciaRespiratoria = parseFloat(historiaClinica.frecuenciaRespiratoria);
    newHistoriaClinica.pulso = parseFloat(historiaClinica.pulso);
    newHistoriaClinica.temperatura = historiaClinica.temperatura;
    
    return this.historiaClinicaRepository.save(newHistoriaClinica);
}
  
  getHistoriasClinicas() {
    return this.historiaClinicaRepository.find();
  }

  async getHistoriaClinica(id: number) {
    const historiaClinicaFound = await this.historiaClinicaRepository.findOne({
      where: {
        id,
      },
    });

    if (!historiaClinicaFound) {
      return new HttpException('Historia clínica not found', HttpStatus.NOT_FOUND);
    }

    return historiaClinicaFound;
  }

  async deleteHistoriaClinica(id: number) {
    const result = await this.historiaClinicaRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Historia clínica not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateHistoriaClinica(id: number, historiaClinica: UpdateHistoriaClinicaDto) {
    const historiaClinicaFound = await this.historiaClinicaRepository.findOne({
      where: {
        id,
      },
    });

    if (!historiaClinicaFound) {
      return new HttpException('Historia clínica not found', HttpStatus.NOT_FOUND);
    }

    const updatedHistoriaClinica = Object.assign(historiaClinicaFound, historiaClinica);
    return this.historiaClinicaRepository.save(updatedHistoriaClinica);
  }
}
