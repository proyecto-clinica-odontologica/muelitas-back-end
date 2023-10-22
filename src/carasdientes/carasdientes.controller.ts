import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarasdientesService } from './carasdientes.service';
import { CreateCarasdienteDto } from './dto/create-carasdiente.dto';
import { UpdateCarasdienteDto } from './dto/update-carasdiente.dto';

@Controller('carasdientes')
export class CarasdientesController {
  constructor(private readonly carasdientesService: CarasdientesService) {}

  @Post()
  create(@Body() createCarasdienteDto: CreateCarasdienteDto) {
    return this.carasdientesService.create(createCarasdienteDto);
  }

  @Get()
  findAll() {
    return this.carasdientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carasdientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarasdienteDto: UpdateCarasdienteDto) {
    return this.carasdientesService.update(+id, updateCarasdienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carasdientesService.remove(+id);
  }
}
