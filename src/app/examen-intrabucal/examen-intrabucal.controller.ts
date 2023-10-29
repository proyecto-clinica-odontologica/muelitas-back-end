import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamenIntrabucalService } from './examen-intrabucal.service';
import { CreateExamenIntrabucalDto } from './dto/create-examen-intrabucal.dto';
import { UpdateExamenIntrabucalDto } from './dto/update-examen-intrabucal.dto';

@Controller('examen-intrabucal')
export class ExamenIntrabucalController {
  constructor(private readonly examenIntrabucalService: ExamenIntrabucalService) {}

  @Post()
  create(@Body() createExamenIntrabucalDto: CreateExamenIntrabucalDto) {
    return this.examenIntrabucalService.create(createExamenIntrabucalDto);
  }

  @Get()
  findAll() {
    return this.examenIntrabucalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examenIntrabucalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamenIntrabucalDto: UpdateExamenIntrabucalDto) {
    return this.examenIntrabucalService.update(+id, updateExamenIntrabucalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examenIntrabucalService.remove(+id);
  }
}
