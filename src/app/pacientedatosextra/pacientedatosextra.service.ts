import { Injectable } from '@nestjs/common';
import { CreatePacientedatosextraDto } from './dto/create-pacientedatosextra.dto';
import { UpdatePacientedatosextraDto } from './dto/update-pacientedatosextra.dto';

@Injectable()
export class PacientedatosextraService {
  create(createPacientedatosextraDto: CreatePacientedatosextraDto) {
    return 'This action adds a new pacientedatosextra';
  }

  findAll() {
    return `This action returns all pacientedatosextra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pacientedatosextra`;
  }

  update(id: number, updatePacientedatosextraDto: UpdatePacientedatosextraDto) {
    return `This action updates a #${id} pacientedatosextra`;
  }

  remove(id: number) {
    return `This action removes a #${id} pacientedatosextra`;
  }
}
