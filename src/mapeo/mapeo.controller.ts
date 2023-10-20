import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapeoService } from './mapeo.service';
import { CreateMapeoDto } from './dto/create-mapeo.dto';
import { UpdateMapeoDto } from './dto/update-mapeo.dto';

@Controller('mapeo')
export class MapeoController {
  constructor(private readonly mapeoService: MapeoService) {}

  @Post()
  create(@Body() createMapeoDto: CreateMapeoDto) {
    return this.mapeoService.create(createMapeoDto);
  }

  @Get()
  findAll() {
    return this.mapeoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapeoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMapeoDto: UpdateMapeoDto) {
    return this.mapeoService.update(+id, updateMapeoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapeoService.remove(+id);
  }
}
