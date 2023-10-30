import { Injectable } from '@nestjs/common';
import { CreateExamenestomatologicoDto } from './dto/create-examenestomatologico.dto';
import { UpdateExamenestomatologicoDto } from './dto/update-examenestomatologico.dto';

@Injectable()
export class ExamenestomatologicoService {
  create(createExamenestomatologicoDto: CreateExamenestomatologicoDto) {
    return 'This action adds a new examenestomatologico';
  }

  findAll() {
    return `This action returns all examenestomatologico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examenestomatologico`;
  }

  update(id: number, updateExamenestomatologicoDto: UpdateExamenestomatologicoDto) {
    return `This action updates a #${id} examenestomatologico`;
  }

  remove(id: number) {
    return `This action removes a #${id} examenestomatologico`;
  }
}
