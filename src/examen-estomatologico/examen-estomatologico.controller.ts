import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamenEstomatologicoService } from './examen-estomatologico.service';
import { CreateExamenEstomatologicoDto } from './dto/create-examen-estomatologico.dto';
import { UpdateExamenEstomatologicoDto } from './dto/update-examen-estomatologico.dto';

@Controller('examen-estomatologico')
export class ExamenEstomatologicoController {
  constructor(private readonly examenEstomatologicoService: ExamenEstomatologicoService) {}

  @Post()
  create(@Param('id') PacienteId:number, @Body() createExamenEstomatologicoDto: CreateExamenEstomatologicoDto) {
    return this.examenEstomatologicoService.create(PacienteId, createExamenEstomatologicoDto);
  }

  @Get()
  findAll() {
    return this.examenEstomatologicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.examenEstomatologicoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExamenEstomatologicoDto: UpdateExamenEstomatologicoDto) {
    return this.examenEstomatologicoService.update(id, updateExamenEstomatologicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.examenEstomatologicoService.remove(id);
  }
}
