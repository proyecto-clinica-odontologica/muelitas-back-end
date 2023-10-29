import { Injectable } from '@nestjs/common';
import { CreateExamenIntrabucalDto } from './dto/create-examen-intrabucal.dto';
import { UpdateExamenIntrabucalDto } from './dto/update-examen-intrabucal.dto';

@Injectable()
export class ExamenIntrabucalService {
  create(createExamenIntrabucalDto: CreateExamenIntrabucalDto) {
    return 'This action adds a new examenIntrabucal';
  }

  findAll() {
    return `This action returns all examenIntrabucal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examenIntrabucal`;
  }

  update(id: number, updateExamenIntrabucalDto: UpdateExamenIntrabucalDto) {
    return `This action updates a #${id} examenIntrabucal`;
  }

  remove(id: number) {
    return `This action removes a #${id} examenIntrabucal`;
  }
}
