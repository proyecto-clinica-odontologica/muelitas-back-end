import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTejidosDuroDto } from './dto/create-tejidos-duro.dto';
import { UpdateTejidosDuroDto } from './dto/update-tejidos-duro.dto';
import { TejidosDurosService } from './tejidos-duros.service';

@Controller('tejidos-duros')
export class TejidosDurosController {
  constructor(private readonly tejidosDurosService: TejidosDurosService) {}

  @Post()
  crearTejidoDuro(@Body() createTejidosDuroDto: CreateTejidosDuroDto) {
    return this.tejidosDurosService.crearTejidoDuro(createTejidosDuroDto);
  }

  @Get()
  obtenerTejidosDuros() {
    return this.tejidosDurosService.obtenerTejidosDuros();
  }

  @Get('deleted')
  obtenerTejidosDurosEliminados() {
    return this.tejidosDurosService.obtenerTejidosDurosEliminados();
  }

  @Get(':id')
  buscarTejidoDuroPorId(@Param('id', ParseIntPipe) id: number) {
    return this.tejidosDurosService.buscarTejidoDuroPorId(id);
  }

  @Patch(':id')
  actualizarTejidoDuro(@Param('id', ParseIntPipe) id: number, @Body() updateTejidosDuroDto: UpdateTejidosDuroDto) {
    return this.tejidosDurosService.actualizarTejidoDuro(id, updateTejidosDuroDto);
  }

  @Delete(':id')
  eliminarTejidoDuro(@Param('id', ParseIntPipe) id: number) {
    return this.tejidosDurosService.eliminarTejidoDuro(id);
  }

  @Patch('restore/:id')
  restaurarTejidoDuro(@Param('id', ParseIntPipe) id: number) {
    return this.tejidosDurosService.restaurarTejidoDuro(id);
  }
}
