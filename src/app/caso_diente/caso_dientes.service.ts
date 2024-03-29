import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DientesService } from '../dientes/dientes.service';
import { Caso_Diente } from './caso_diente.entity';
import { CreateCasoDienteDto } from './dto/create-caso-diente.dto';

@Injectable()
export class CasoDienteService {
  constructor(
    @InjectRepository(Caso_Diente)
    private casoDienteRepository: Repository<Caso_Diente>,
    private dienteService: DientesService,
  ) {}

  async createCasoDiente(casoDiente: CreateCasoDienteDto) {
    const dienteExiste = await this.dienteService.getDiente(casoDiente.idDiente);

    if (!dienteExiste) {
      return new HttpException('Diente no Existe', HttpStatus.NOT_FOUND);
    }

    const newCasoDiente = this.casoDienteRepository.create(casoDiente);
    return this.casoDienteRepository.save(newCasoDiente);
  }

  getCasoDiente() {
    return this.casoDienteRepository.find({
      relations: ['diente'],
    });
  }
}
