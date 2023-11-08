import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreatePreparacionQuimicaDto } from './dto/create-preparacion-quimica.dto';
import { UpdatePreparacionQuimicaDto } from './dto/update-preparacion-quimica.dto';
import { PreparacionQuimicaService } from './preparacion-quimica.service';

@Controller('preparacion-quimica')
export class PreparacionQuimicaController {
  constructor(private readonly preparacionQuimicaService: PreparacionQuimicaService) {}

  @Post('create')
  registrarPreparacionQuimica(@Body() createPreparacionQuimicaDto: CreatePreparacionQuimicaDto) {
    return this.preparacionQuimicaService.registrarPreparacionQuimica(createPreparacionQuimicaDto);
  }

  @Get()
  obtenerPreparacionesQuimicas() {
    return this.preparacionQuimicaService.obtenerPreparacionesQuimicas();
  }

  @Get('deleted')
  obtenerPreparacionesQuimicasEliminadas() {
    return this.preparacionQuimicaService.obtenerPreparacionesQuimicasEliminadas();
  }

  @Get('search/id/:id')
  buscarPreparacionQuimicaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.preparacionQuimicaService.buscarPreparacionQuimicaPorId(id);
  }

  @Put('update/:id')
  actualizarPreparacionQuimica(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePreparacionQuimicaDto: UpdatePreparacionQuimicaDto,
  ) {
    return this.preparacionQuimicaService.actualizarPreparacionQuimica(id, updatePreparacionQuimicaDto);
  }

  @Delete('delete/:id')
  eliminarPreparacionQuimica(@Param('id', ParseIntPipe) id: number) {
    return this.preparacionQuimicaService.eliminarPreparacionQuimica(id);
  }

  @Patch('restore/:id')
  restaurarPreparacionQuimica(@Param('id', ParseIntPipe) id: number) {
    return this.preparacionQuimicaService.restaurarPreparacionQuimica(id);
  }
}
