import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateInterpretacionRadiograficaDto } from './dto/create-interpretacion-radiografica.dto';
import { UpdateInterpretacionRadiograficaDto } from './dto/update-interpretacion-radiografica.dto';
import { InterpretacionRadiograficaService } from './interpretacion-radiografica.service';

@Controller('interpretacion-radiografica')
export class InterpretacionRadiograficaController {
  constructor(private readonly interpretacionRadiograficaService: InterpretacionRadiograficaService) {}

  @Post('create')
  create(@Body() createInterpretacionRadiograficaDto: CreateInterpretacionRadiograficaDto) {
    return this.interpretacionRadiograficaService.create(createInterpretacionRadiograficaDto);
  }

  @Get()
  findAll() {
    return this.interpretacionRadiograficaService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.interpretacionRadiograficaService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.interpretacionRadiograficaService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInterpretacionRadiograficaDto: UpdateInterpretacionRadiograficaDto) {
    return this.interpretacionRadiograficaService.update(id, updateInterpretacionRadiograficaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interpretacionRadiograficaService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.interpretacionRadiograficaService.restore(id);
  }
}
