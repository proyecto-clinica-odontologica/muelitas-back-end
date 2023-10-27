import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateExamenGeneralDto } from './dto/create-examen-general.dto';
import { UpdateExamenGeneralDto } from './dto/update-examen-general.dto';
import { ExamenGeneralService } from './examen-general.service';

@Controller('examen-general')
export class ExamenGeneralController {
  constructor(private readonly examenGeneralService: ExamenGeneralService) {}

  @Post('create')
  registrarExamenGeneral(@Body() createExamenGeneralDto: CreateExamenGeneralDto) {
    return this.examenGeneralService.registrarExamenGeneral(createExamenGeneralDto);
  }

  @Get()
  obtenerExamenesGenerales() {
    return this.examenGeneralService.obtenerExamenesGenerales();
  }

  @Get('deleted')
  obtenerExamenesGeneralesEliminados() {
    return this.examenGeneralService.obtenerExamenesGeneralesEliminados();
  }

  @Get('search/:id')
  buscarExamenGeneralPorId(@Param('id', ParseIntPipe) id: number) {
    return this.examenGeneralService.buscarExamenGeneralPorId(id);
  }

  @Patch('update/:id')
  actualizarExamenGeneral(@Param('id', ParseIntPipe) id: number, @Body() updateExamenGeneralDto: UpdateExamenGeneralDto) {
    return this.examenGeneralService.actualizarExamenGeneral(id, updateExamenGeneralDto);
  }

  @Delete('delete/:id')
  eliminarExamenGeneral(@Param('id', ParseIntPipe) id: number) {
    return this.examenGeneralService.eliminarExamenGeneral(id);
  }

  @Patch('restore/:id')
  restaurarExamenGeneral(@Param('id', ParseIntPipe) id: number) {
    return this.examenGeneralService.restaurarExamenGeneral(id);
  }
}
