import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateExamenAuxiliarDto } from './dto/create-examen-auxiliar.dto';
import { UpdateExamenAuxiliarDto } from './dto/update-examen-auxiliar.dto';
import { ExamenAuxiliarService } from './examen-auxiliar.service';

@Controller('examen-auxiliar')
export class ExamenAuxiliarController {
  constructor(private readonly examenAuxiliarService: ExamenAuxiliarService) {}

  @Post('create')
  crearExamenAuxiliar(@Body() createExamenAuxiliarDto: CreateExamenAuxiliarDto) {
    return this.examenAuxiliarService.crearExamenAuxiliar(createExamenAuxiliarDto);
  }

  @Get()
  obtenerExamenesAuxiliares() {
    return this.examenAuxiliarService.obtenerExamenesAuxiliares();
  }

  @Get('deleted')
  obtenerExamenesAuxiliaresEliminados() {
    return this.examenAuxiliarService.obtenerExamenesAuxiliaresEliminados();
  }

  @Get('search/:id')
  buscarExamenAuxiliarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.examenAuxiliarService.buscarExamenAuxiliarPorId(id);
  }

  @Patch('update/:id')
  actualizarExamenAuxiliar(@Param('id', ParseIntPipe) id: number, @Body() updateExamenAuxiliarDto: UpdateExamenAuxiliarDto) {
    return this.examenAuxiliarService.actualizarExamenAuxiliar(id, updateExamenAuxiliarDto);
  }

  @Delete(':id')
  eliminarExamenAuxiliar(@Param('id', ParseIntPipe) id: number) {
    return this.examenAuxiliarService.eliminarExamenAuxiliar(id);
  }

  @Patch('restore/:id')
  restaurarExamenAuxiliar(@Param('id', ParseIntPipe) id: number) {
    return this.examenAuxiliarService.restaurarExamenAuxiliar(id);
  }
}
