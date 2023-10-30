import { Injectable } from '@nestjs/common';
import { CreateOclusionDto } from './dto/create-oclusion.dto';
import { UpdateOclusionDto } from './dto/update-oclusion.dto';

@Injectable()
export class OclusionService {
  create(createOclusionDto: CreateOclusionDto) {
    return 'This action adds a new oclusion';
  }

  findAll() {
    return `This action returns all oclusion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oclusion`;
  }

  update(id: number, updateOclusionDto: UpdateOclusionDto) {
    return `This action updates a #${id} oclusion`;
  }

  remove(id: number) {
    return `This action removes a #${id} oclusion`;
  }
}
