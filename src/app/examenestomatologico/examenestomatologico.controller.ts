import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamenestomatologicoService } from './examenestomatologico.service';
import { CreateExamenestomatologicoDto } from './dto/create-examenestomatologico.dto';
import { UpdateExamenestomatologicoDto } from './dto/update-examenestomatologico.dto';

@Controller('examenestomatologico')
export class ExamenestomatologicoController {
  constructor(private readonly examenestomatologicoService: ExamenestomatologicoService) {}

  @Post()
  create(@Body() createExamenestomatologicoDto: CreateExamenestomatologicoDto) {
    return this.examenestomatologicoService.create(createExamenestomatologicoDto);
  }

  @Get()
  findAll() {
    return this.examenestomatologicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examenestomatologicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamenestomatologicoDto: UpdateExamenestomatologicoDto) {
    return this.examenestomatologicoService.update(+id, updateExamenestomatologicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examenestomatologicoService.remove(+id);
  }
}
