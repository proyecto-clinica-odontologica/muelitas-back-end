import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ConductometriaService } from './conductometria.service';
import { CreateConductometriaDto } from './dto/create-conductometria.dto';
import { UpdateConductometriaDto } from './dto/update-conductometria.dto';

@Controller('conductometria')
export class ConductometriaController {
  constructor(private readonly conductometriaService: ConductometriaService) {}

  @Post('create')
  create(@Body() createConductometriaDto: CreateConductometriaDto) {
    return this.conductometriaService.create(createConductometriaDto);
  }

  @Get()
  findAll() {
    return this.conductometriaService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.conductometriaService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.conductometriaService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateConductometriaDto: UpdateConductometriaDto) {
    return this.conductometriaService.update(id, updateConductometriaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conductometriaService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.conductometriaService.restore(id);
  }
}
