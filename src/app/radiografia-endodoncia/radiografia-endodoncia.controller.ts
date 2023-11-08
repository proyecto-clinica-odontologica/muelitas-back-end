import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateRadiografiaEndodonciaDto } from './dto/create-radiografia-endodoncia.dto';
import { UpdateRadiografiaEndodonciaDto } from './dto/update-radiografia-endodoncia.dto';
import { RadiografiaEndodonciaService } from './radiografia-endodoncia.service';

@Controller('radiografia-endodoncia')
export class RadiografiaEndodonciaController {
  constructor(private readonly radiografiaEndodonciaService: RadiografiaEndodonciaService) {}

  @Post('create')
  registrarRadiografiaEndodoncia(@Body() createRadiografiaEndodonciaDto: CreateRadiografiaEndodonciaDto) {
    return this.radiografiaEndodonciaService.registrarRadiografiaEndodoncia(createRadiografiaEndodonciaDto);
  }

  @Get()
  obtenerRadiografiasEndodoncias() {
    return this.radiografiaEndodonciaService.obtenerRadiografiasEndodoncias();
  }

  @Get('deleted')
  obtenerRadiografiasEndodonciasEliminadas() {
    return this.radiografiaEndodonciaService.obtenerRadiografiasEndodonciasEliminadas();
  }

  @Get('search/id/:id')
  buscarRadiografiaEndodonciaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.radiografiaEndodonciaService.buscarRadiografiaEndodonciaPorId(id);
  }

  @Put('update/:id')
  actualizarRadiografiaEndodoncia(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRadiografiaEndodonciaDto: UpdateRadiografiaEndodonciaDto,
  ) {
    return this.radiografiaEndodonciaService.actualizarRadiografiaEndodoncia(id, updateRadiografiaEndodonciaDto);
  }

  @Delete('delete/:id')
  eliminarRadiografiaEndodoncia(@Param('id', ParseIntPipe) id: number) {
    return this.radiografiaEndodonciaService.eliminarRadiografiaEndodoncia(id);
  }

  @Patch('restore/:id')
  restaurarRadiografiaEndodoncia(@Param('id', ParseIntPipe) id: number) {
    return this.radiografiaEndodonciaService.restaurarRadiografiaEndodoncia(id);
  }
}
