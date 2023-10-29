import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { DolorService } from './dolor.service';
import { CreateDolorDto } from './dto/create-dolor.dto';
import { UpdateDolorDto } from './dto/update-dolor.dto';

@Controller('dolor')
export class DolorController {
  constructor(private readonly dolorService: DolorService) {}

  @Post('create')
  crearDolorMolar(@Body() createDolorDto: CreateDolorDto) {
    return this.dolorService.crearDolorMolar(createDolorDto);
  }

  @Get()
  obtenerDoloresMolares() {
    return this.dolorService.obtenerDoloresMolares();
  }

  @Get('deleted')
  obtenerDoloresMolaresEliminados() {
    return this.dolorService.obtenerDoloresMolaresEliminados();
  }

  @Get('search/:id')
  buscarDolorMolarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.dolorService.buscarDolorMolarPorId(id);
  }

  @Put('update/:id')
  actualizarDolorMolar(@Param('id', ParseIntPipe) id: number, @Body() updateDolorDto: UpdateDolorDto) {
    return this.dolorService.actualizarDolorMolar(id, updateDolorDto);
  }

  @Delete('delete/:id')
  eliminarDolorMolar(@Param('id', ParseIntPipe) id: number) {
    return this.dolorService.eliminarDolorMolar(id);
  }

  @Patch('restore/:id')
  restaurarDolorMolar(@Param('id', ParseIntPipe) id: number) {
    return this.dolorService.restaurarDolorMolar(id);
  }
}
