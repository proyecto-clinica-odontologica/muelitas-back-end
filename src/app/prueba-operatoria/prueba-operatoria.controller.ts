import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreatePruebaOperatoriaDto } from './dto/create-prueba-operatoria.dto';
import { UpdatePruebaOperatoriaDto } from './dto/update-prueba-operatoria.dto';
import { PruebaOperatoriaService } from './prueba-operatoria.service';

@Controller('prueba-operatoria')
export class PruebaOperatoriaController {
  constructor(private readonly pruebaOperatoriaService: PruebaOperatoriaService) {}

  @Post('create')
  create(@Body() createPruebaOperatoriaDto: CreatePruebaOperatoriaDto) {
    return this.pruebaOperatoriaService.create(createPruebaOperatoriaDto);
  }

  @Get()
  findAll() {
    return this.pruebaOperatoriaService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.pruebaOperatoriaService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.pruebaOperatoriaService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePruebaOperatoriaDto: UpdatePruebaOperatoriaDto) {
    return this.pruebaOperatoriaService.update(id, updatePruebaOperatoriaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pruebaOperatoriaService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.pruebaOperatoriaService.restore(id);
  }
}
