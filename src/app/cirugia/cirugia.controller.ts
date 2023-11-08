import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CirugiaService } from './cirugia.service';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';

@Controller('cirugia')
export class CirugiaController {
  constructor(private readonly cirugiaService: CirugiaService) {}

  @Post('create')
  create(@Body() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiaService.create(createCirugiaDto);
  }

  @Get()
  findAll() {
    return this.cirugiaService.findAll();
  }

  @Get()
  findAllDelete() {
    return this.cirugiaService.findAllDelete();
  }

  @Get('search/id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiaService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCirugiaDto: UpdateCirugiaDto) {
    return this.cirugiaService.update(id, updateCirugiaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiaService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiaService.restore(id);
  }
}
