import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateOpturacionConductoDto } from './dto/create-opturacion-conducto.dto';
import { UpdateOpturacionConductoDto } from './dto/update-opturacion-conducto.dto';
import { OpturacionConductosService } from './opturacion-conductos.service';

@Controller('opturacion-conductos')
export class OpturacionConductosController {
  constructor(private readonly opturacionConductosService: OpturacionConductosService) {}

  @Post('create')
  registrarOpturacionDeConducto(@Body() createOpturacionConductoDto: CreateOpturacionConductoDto) {
    return this.opturacionConductosService.registrarOpturacionDeConducto(createOpturacionConductoDto);
  }

  @Get()
  obtenerOpturacionesDeConductos() {
    return this.opturacionConductosService.obtenerOpturacionesDeConductos();
  }

  @Get('deleted')
  obtenerOpturacionesDeConductosEliminados() {
    return this.opturacionConductosService.obtenerOpturacionesDeConductosEliminados();
  }

  @Get('search/id/:id')
  buscarOpturacionDeConductoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.opturacionConductosService.buscarOpturacionDeConductoPorId(id);
  }

  @Put('update/:id')
  actualizarOpturacionDeConducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOpturacionConductoDto: UpdateOpturacionConductoDto,
  ) {
    return this.opturacionConductosService.actualizarOpturacionDeConducto(id, updateOpturacionConductoDto);
  }

  @Delete('delete/:id')
  eliminarOpturacionDeConducto(@Param('id', ParseIntPipe) id: number) {
    return this.opturacionConductosService.eliminarOpturacionDeConducto(id);
  }

  @Patch('restore/:id')
  restaurarOpturacionDeConducto(@Param('id', ParseIntPipe) id: number) {
    return this.opturacionConductosService.restaurarOpturacionDeConducto(id);
  }
}
