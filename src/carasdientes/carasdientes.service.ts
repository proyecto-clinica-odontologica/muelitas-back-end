import { Injectable } from '@nestjs/common';
import { CreateCarasdienteDto } from './dto/create-carasdiente.dto';
import { UpdateCarasdienteDto } from './dto/update-carasdiente.dto';

@Injectable()
export class CarasdientesService {
  create(createCarasdienteDto: CreateCarasdienteDto) {
    return 'This action adds a new carasdiente';
  }

  findAll() {
    return `This action returns all carasdientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carasdiente`;
  }

  update(id: number, updateCarasdienteDto: UpdateCarasdienteDto) {
    return `This action updates a #${id} carasdiente`;
  }

  remove(id: number) {
    return `This action removes a #${id} carasdiente`;
  }
}
