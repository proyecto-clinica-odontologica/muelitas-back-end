import { Injectable } from '@nestjs/common';
import { CreateDolorDto } from './dto/create-dolor.dto';
import { UpdateDolorDto } from './dto/update-dolor.dto';

@Injectable()
export class DolorService {
  create(createDolorDto: CreateDolorDto) {
    return 'This action adds a new dolor';
  }

  findAll() {
    return `This action returns all dolor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dolor`;
  }

  update(id: number, updateDolorDto: UpdateDolorDto) {
    return `This action updates a #${id} dolor`;
  }

  remove(id: number) {
    return `This action removes a #${id} dolor`;
  }
}
