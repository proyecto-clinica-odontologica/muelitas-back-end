import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterpretacionService } from './interpretacion.service';
import { CreateInterpretacionDto } from './dto/create-interpretacion.dto';
import { UpdateInterpretacionDto } from './dto/update-interpretacion.dto';

@Controller('interpretacion')
export class InterpretacionController {
  constructor(private readonly interpretacionService: InterpretacionService) {}

  @Post(':id')
  create(@Param('id') PacienteId:number,  @Body() createInterpretacionDto: CreateInterpretacionDto) {
    return this.interpretacionService.create(PacienteId, createInterpretacionDto);
  }

  @Get()
  findAll() {
    return this.interpretacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.interpretacionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInterpretacionDto: UpdateInterpretacionDto) {
    return this.interpretacionService.update(id, updateInterpretacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.interpretacionService.remove(id);
  }
}
