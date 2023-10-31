import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateNotaEvolutivaDto } from './dto/create-nota-evolutiva.dto';
import { UpdateNotaEvolutivaDto } from './dto/update-nota-evolutiva.dto';
import { NotaEvolutivaService } from './nota-evolutiva.service';

@Controller('nota-evolutiva')
export class NotaEvolutivaController {
  constructor(private readonly notaEvolutivaService: NotaEvolutivaService) {}

  @Post('create')
  registrarNotaEvolutiva(@Body() createNotaEvolutivaDto: CreateNotaEvolutivaDto) {
    return this.notaEvolutivaService.registrarNotaEvolutiva(createNotaEvolutivaDto);
  }

  @Get()
  obtenerNotasEvolutivas() {
    return this.notaEvolutivaService.obtenerNotasEvolutivas();
  }

  @Get('deleted')
  obtenerNotasEvolutivasEliminadas() {
    return this.notaEvolutivaService.obtenerNotasEvolutivasEliminadas();
  }

  @Get('search/id/:id')
  buscarNotaEvolutivaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.notaEvolutivaService.buscarNotaEvolutivaPorId(id);
  }

  @Put('update/:id')
  actualizarNotaEvolutiva(@Param('id', ParseIntPipe) id: number, @Body() updateNotaEvolutivaDto: UpdateNotaEvolutivaDto) {
    return this.notaEvolutivaService.actualizarNotaEvolutiva(id, updateNotaEvolutivaDto);
  }

  @Delete('delete/:id')
  eliminarNotaEvolutiva(@Param('id', ParseIntPipe) id: number) {
    return this.notaEvolutivaService.eliminarNotaEvolutiva(id);
  }

  @Patch('restore/:id')
  restaurarNotaEvolutiva(@Param('id', ParseIntPipe) id: number) {
    return this.notaEvolutivaService.restaurarNotaEvolutiva(id);
  }
}
