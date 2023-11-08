import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateEndodonciaDto } from './dto/create-endodoncia.dto';
import { UpdateEndodonciaDto } from './dto/update-endodoncia.dto';
import { EndodonciaService } from './endodoncia.service';

@Controller('endodoncia')
export class EndodonciaController {
  constructor(private readonly endodonciaService: EndodonciaService) {}

  @Post('create')
  registrarEndodoncia(@Body() createEndodonciaDto: CreateEndodonciaDto) {
    return this.endodonciaService.registrarEndodoncia(createEndodonciaDto);
  }

  @Get()
  obtenerEndodoncias() {
    return this.endodonciaService.obtenerEndodoncias();
  }

  @Get('deleted')
  obtenerEndodonciasEliminadas() {
    return this.endodonciaService.obtenerEndodonciasEliminadas();
  }

  @Get('search/id/:id')
  buscarEndodonciaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.endodonciaService.buscarEndodonciaPorId(id);
  }

  @Put('update/:id')
  actualizarEndodoncia(@Param('id', ParseIntPipe) id: number, @Body() updateEndodonciaDto: UpdateEndodonciaDto) {
    return this.endodonciaService.actualizarEndodoncia(id, updateEndodonciaDto);
  }

  @Delete('delete/:id')
  eliminarEndodoncia(@Param('id', ParseIntPipe) id: number) {
    return this.endodonciaService.eliminarEndodoncia(id);
  }

  @Patch('restore/:id')
  restaurarEndodoncia(@Param('id', ParseIntPipe) id: number) {
    return this.endodonciaService.restaurarEndodoncia(id);
  }
}
