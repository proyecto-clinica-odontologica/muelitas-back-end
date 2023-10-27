import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';

@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  @Post()
  create(@Body() createSeguimientoDto: CreateSeguimientoDto) {
    return this.seguimientoService.create(createSeguimientoDto);
  }

  @Get()
  findAll() {
    return this.seguimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.seguimientoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSeguimientoDto: UpdateSeguimientoDto) {
    return this.seguimientoService.update(id, updateSeguimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.seguimientoService.remove(id);
  }
}
