import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateTecnicaRadiograficaDto } from './dto/create-tecnica-radiografica.dto';
import { UpdateTecnicaRadiograficaDto } from './dto/update-tecnica-radiografica.dto';
import { TecnicaRadiograficaService } from './tecnica-radiografica.service';

@Controller('tecnica-radiografica')
export class TecnicaRadiograficaController {
  constructor(private readonly tecnicaRadiograficaService: TecnicaRadiograficaService) {}

  @Post('create')
  create(@Body() createTecnicaRadiograficaDto: CreateTecnicaRadiograficaDto) {
    return this.tecnicaRadiograficaService.create(createTecnicaRadiograficaDto);
  }

  @Get()
  findAll() {
    return this.tecnicaRadiograficaService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.tecnicaRadiograficaService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.tecnicaRadiograficaService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTecnicaRadiograficaDto: UpdateTecnicaRadiograficaDto) {
    return this.tecnicaRadiograficaService.update(id, updateTecnicaRadiograficaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tecnicaRadiograficaService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.tecnicaRadiograficaService.restore(id);
  }
}
