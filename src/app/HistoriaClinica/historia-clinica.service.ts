import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/entities/paciente.entity';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { HistoriaClinica } from './dto/historia-clinica.entity';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,

    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async createHistoriaClinica(historiaClinicaDto: CreateHistoriaClinicaDto) {
    try {
      const paciente = await this.pacienteRepository.findOne({
        where: { id: historiaClinicaDto.IdPaciente },
      });

      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado en la base de datos');
      }

      const historiaClinica = this.historiaClinicaRepository.create({
        ...historiaClinicaDto,
        paciente,
      });

      return await this.historiaClinicaRepository.save(historiaClinica);
    } catch (error) {
      throw error;
    }
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
      throw new NotFoundException('Historia clínica no encontrada en la base de datos');
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

  async updateHistoriaClinica(id: number, updateHistoriaClinicaDto: UpdateHistoriaClinicaDto) {
    try {
      const historiaClinica = await this.historiaClinicaRepository.findOne({
        where: { paciente: { id } },
        relations: ['paciente'],
      });

      if (!historiaClinica) {
        throw new NotFoundException('Historia clínica no encontrada en la base de datos');
      }

      Object.assign(historiaClinica, updateHistoriaClinicaDto);

      return await this.historiaClinicaRepository.save(historiaClinica);
    } catch (error) {
      throw error;
    }
  }

  async getHistoriaClinicaByPaciente(id: number) {
    try {
      const paciente = await this.pacienteRepository.findOne({
        where: { id },
      });

      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado en la base de datos');
      }

      const historiaClinica = await this.historiaClinicaRepository.findOne({
        where: {
          paciente: {
            id,
          },
        },
      });

      if (!historiaClinica) {
        throw new NotFoundException('Historia clínica no encontrada en la base de datos');
      }

      return historiaClinica;
    } catch (error) {
      throw error;
    }
  }
}
