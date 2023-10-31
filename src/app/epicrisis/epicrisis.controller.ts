import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateEpicrisisDto } from './dto/create-epicrisis.dto';
import { UpdateEpicrisisDto } from './dto/update-epicrisis.dto';
import { EpicrisisService } from './epicrisis.service';

@Controller('epicrisis')
export class EpicrisisController {
  constructor(private readonly epicrisisService: EpicrisisService) {}

  @Post()
  registrarEpicrisis(@Body() createEpicrisisDto: CreateEpicrisisDto) {
    return this.epicrisisService.registrarEpicrisis(createEpicrisisDto);
  }

  @Get()
  obtenerEpicrisis() {
    return this.epicrisisService.obtenerEpicrisis();
  }

  @Get('deleted')
  obtenerEpicrisisEliminadas() {
    return this.epicrisisService.obtenerEpicrisisEliminadas();
  }

  @Get('search/id/:id')
  buscarEpicrisisPorId(@Param('id', ParseIntPipe) id: number) {
    return this.epicrisisService.buscarEpicrisisPorId(id);
  }

  @Put('update/:id')
  actualizarEpicrisis(@Param('id', ParseIntPipe) id: number, @Body() updateEpicrisisDto: UpdateEpicrisisDto) {
    return this.epicrisisService.actualizarEpicrisis(id, updateEpicrisisDto);
  }

  @Delete('delete/:id')
  eliminarEpicrisis(@Param('id', ParseIntPipe) id: number) {
    return this.epicrisisService.eliminarEpicrisis(id);
  }

  @Patch('restore/:id')
  restaurarEpicrisis(@Param('id', ParseIntPipe) id: number) {
    return this.epicrisisService.restaurarEpicrisis(id);
  }
}
