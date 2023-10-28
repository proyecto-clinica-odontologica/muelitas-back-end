import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AnivelPiezaService } from './anivel-pieza.service';
import { CreateAnivelPiezaDto } from './dto/create-anivel-pieza.dto';
import { UpdateAnivelPiezaDto } from './dto/update-anivel-pieza.dto';

@Controller('anivel-pieza')
export class AnivelPiezaController {
  constructor(private readonly anivelPiezaService: AnivelPiezaService) {}

  @Post('create')
  crearNivelPieza(@Body() createAnivelPiezaDto: CreateAnivelPiezaDto) {
    return this.anivelPiezaService.crearNivelPieza(createAnivelPiezaDto);
  }

  @Get()
  obtenerNivelesDePiezas() {
    return this.anivelPiezaService.obtenerNivelesDePiezas();
  }

  @Get('deleted')
  obtenerNivelesDePiezasEliminadas() {
    return this.anivelPiezaService.obtenerNivelesDePiezasEliminadas();
  }

  @Get('search/:id')
  buscarNivelPiezaPorId(@Param('id') id: number) {
    return this.anivelPiezaService.buscarNivelPiezaPorId(id);
  }

  @Put('update:id')
  actualizarNivelPieza(@Param('id') id: number, @Body() updateAnivelPiezaDto: UpdateAnivelPiezaDto) {
    return this.anivelPiezaService.actualizarNivelPieza(id, updateAnivelPiezaDto);
  }

  @Delete('delete/:id')
  eliminarNivelPieza(@Param('id') id: number) {
    return this.anivelPiezaService.eliminarNivelPieza(id);
  }

  @Patch('restore/:id')
  restaurarNivelPieza(@Param('id') id: number) {
    return this.anivelPiezaService.restaurarNivelPieza(id);
  }
}
