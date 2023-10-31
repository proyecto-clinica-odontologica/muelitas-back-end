import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateInterpretacionDto } from './dto/create-interpretacion.dto';
import { UpdateInterpretacionDto } from './dto/update-interpretacion.dto';
import { InterpretacionService } from './interpretacion.service';

@Controller('interpretacion')
export class InterpretacionController {
  constructor(private readonly interpretacionService: InterpretacionService) {}

  @Post('create')
  registrarInterpretacion(@Body() createInterpretacionDto: CreateInterpretacionDto) {
    return this.interpretacionService.registrarInterpretacion(createInterpretacionDto);
  }

  @Get()
  obtenerInterpretaciones() {
    return this.interpretacionService.obtenerInterpretaciones();
  }

  @Get('deleted')
  obtenerInterpretacionesEliminadas() {
    return this.interpretacionService.obtenerInterpretacionesEliminadas();
  }

  @Get('search/id/:id')
  buscarInterpretacionPorId(@Param('id', ParseIntPipe) id: number) {
    return this.interpretacionService.buscarInterpretacionPorId(id);
  }

  @Put('update/:id')
  actualizarInterpretacion(@Param('id', ParseIntPipe) id: number, @Body() updateInterpretacionDto: UpdateInterpretacionDto) {
    return this.interpretacionService.actualizarInterpretacion(id, updateInterpretacionDto);
  }

  @Delete('delete/:id')
  eliminarInterpretacion(@Param('id', ParseIntPipe) id: number) {
    return this.interpretacionService.eliminarInterpretacion(id);
  }

  @Patch('restore/:id')
  restaurarInterpretacion(@Param('id', ParseIntPipe) id: number) {
    return this.interpretacionService.restaurarInterpretacion(id);
  }
}
