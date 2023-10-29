import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateExamenIntrabucalDto } from './dto/create-examen-intrabucal.dto';
import { UpdateExamenIntrabucalDto } from './dto/update-examen-intrabucal.dto';
import { ExamenIntrabucalService } from './examen-intrabucal.service';

@Controller('examen-intrabucal')
export class ExamenIntrabucalController {
  constructor(private readonly examenIntrabucalService: ExamenIntrabucalService) {}

  @Post('create')
  crearExamenIntrabucal(@Body() createExamenIntrabucalDto: CreateExamenIntrabucalDto) {
    return this.examenIntrabucalService.crearExamenIntrabucal(createExamenIntrabucalDto);
  }

  @Get()
  obtenerExamenesIntrabucales() {
    return this.examenIntrabucalService.obtenerExamenesIntrabucales();
  }

  @Get('deleted')
  obtenerExamenesIntrabucalesEliminados() {
    return this.examenIntrabucalService.obtenerExamenesIntrabucalesEliminados();
  }

  @Get('search/:id')
  buscarExamenIntrabucalPorId(@Param('id', ParseIntPipe) id: number) {
    return this.examenIntrabucalService.buscarExamenIntrabucalPorId(id);
  }

  @Patch('update/:id')
  actualizarExamenIntrabucal(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamenIntrabucalDto: UpdateExamenIntrabucalDto,
  ) {
    return this.examenIntrabucalService.actualizarExamenIntrabucal(id, updateExamenIntrabucalDto);
  }

  @Delete('delete/:id')
  eliminarExamenIntrabucal(@Param('id', ParseIntPipe) id: number) {
    return this.examenIntrabucalService.eliminarExamenIntrabucal(id);
  }

  @Patch('restore/:id')
  restaurarExamenIntrabucal(@Param('id', ParseIntPipe) id: number) {
    return this.examenIntrabucalService.restaurarExamenIntrabucal(id);
  }
}
