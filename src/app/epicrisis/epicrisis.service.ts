import { Injectable } from '@nestjs/common';
import { CreateEpicrisisDto } from './dto/create-epicrisis.dto';
import { UpdateEpicrisisDto } from './dto/update-epicrisis.dto';

@Injectable()
export class EpicrisisService {
  create(createEpicrisisDto: CreateEpicrisisDto) {
    return 'This action adds a new epicrisis';
  }

  findAll() {
    return `This action returns all epicrisis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} epicrisis`;
  }

  update(id: number, updateEpicrisisDto: UpdateEpicrisisDto) {
    return `This action updates a #${id} epicrisis`;
  }

  remove(id: number) {
    return `This action removes a #${id} epicrisis`;
  }
}
