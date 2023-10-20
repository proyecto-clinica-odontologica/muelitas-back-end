import { Injectable } from '@nestjs/common';
import { CreateMapeoDto } from './dto/create-mapeo.dto';
import { UpdateMapeoDto } from './dto/update-mapeo.dto';

@Injectable()
export class MapeoService {
  create(createMapeoDto: CreateMapeoDto) {
    return 'This action adds a new mapeo';
  }

  findAll() {
    return `This action returns all mapeo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mapeo`;
  }

  update(id: number, updateMapeoDto: UpdateMapeoDto) {
    return `This action updates a #${id} mapeo`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapeo`;
  }
}
