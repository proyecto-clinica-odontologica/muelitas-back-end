/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { HistoriaClinica } from './dto/historia-clinica.entity';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private historiaClinicaRepository: Repository<HistoriaClinica>,
  ) {}

  async createHistoriaClinica(historiaClinica: CreateHistoriaClinicaDto) {
    const errors = await validate(historiaClinica);

    if (errors.length > 0) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }

    const newHistoriaClinica = new HistoriaClinica();
    newHistoriaClinica.MotivoConsulta = historiaClinica.MotivoConsulta;
    newHistoriaClinica.EnfermedadActual = historiaClinica.EnfermedadActual;
    newHistoriaClinica.PresionArterial = parseFloat(historiaClinica.PresionArterial);
    newHistoriaClinica.FrecuenciaRespiratoria = parseFloat(historiaClinica.FrecuenciaRespiratoria);
    newHistoriaClinica.Pulso = parseFloat(historiaClinica.Pulso);
    newHistoriaClinica.Temperatura = historiaClinica.Temperatura;

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
