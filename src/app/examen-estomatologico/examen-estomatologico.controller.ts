import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateExamenEstomatologicoDto } from './dto/create-examen-estomatologico.dto';
import { UpdateExamenEstomatologicoDto } from './dto/update-examen-estomatologico.dto';
import { ExamenEstomatologicoService } from './examen-estomatologico.service';

@Controller('examen-estomatologico')
export class ExamenEstomatologicoController {
  constructor(private readonly examenEstomatologicoService: ExamenEstomatologicoService) {}

  @Post()
  registrarExamenEstomatologico(@Body() createExamenEstomatologicoDto: CreateExamenEstomatologicoDto) {
    return this.examenEstomatologicoService.registrarExamenEstomatologico(createExamenEstomatologicoDto);
  }

  @Get()
  obtenerExamenesEstomatologicos() {
    return this.examenEstomatologicoService.obtenerExamenesEstomatologicos();
  }

  @Get('deleted')
  obtenerExamenesEstomatologicosEliminados() {
    return this.examenEstomatologicoService.obtenerExamenesEstomatologicosEliminados();
  }

  @Get('search/id/:id')
  buscarExamenEstomatologicoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.examenEstomatologicoService.buscarExamenEstomatologicoPorId(id);
  }

  @Patch('update/:id')
  actualizarExamenEstomatologico(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamenEstomatologicoDto: UpdateExamenEstomatologicoDto,
  ) {
    return this.examenEstomatologicoService.actualizarExamenEstomatologico(id, updateExamenEstomatologicoDto);
  }

  @Delete('delete/:id')
  eliminarExamenEstomatologico(@Param('id', ParseIntPipe) id: number) {
    return this.examenEstomatologicoService.eliminarExamenEstomatologico(id);
  }

  @Patch('restore/:id')
  restaurarExamenEstomatologico(@Param('id', ParseIntPipe) id: number) {
    return this.examenEstomatologicoService.restaurarExamenEstomatologico(id);
  }
}
