import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotasEvolutivasService } from './notas-evolutivas.service';
import { CreateNotasEvolutivaDto } from './dto/create-notas-evolutiva.dto';
import { UpdateNotasEvolutivaDto } from './dto/update-notas-evolutiva.dto';

@Controller('notas-evolutivas')
export class NotasEvolutivasController {
  constructor(private readonly notasEvolutivasService: NotasEvolutivasService) {}

  @Post(':id')
  create(@Param('id') PacienteId:number, @Body() createNotasEvolutivaDto: CreateNotasEvolutivaDto) {
    return this.notasEvolutivasService.create(PacienteId, createNotasEvolutivaDto);
  }

  @Get()
  findAll() {
    return this.notasEvolutivasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notasEvolutivasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotasEvolutivaDto: UpdateNotasEvolutivaDto) {
    return this.notasEvolutivasService.update(+id, updateNotasEvolutivaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notasEvolutivasService.remove(id);
  }
}
