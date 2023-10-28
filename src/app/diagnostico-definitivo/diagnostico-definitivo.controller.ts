import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { DiagnosticoDefinitivoService } from './diagnostico-definitivo.service';
import { CreateDiagnosticoDefinitivoDto } from './dto/create-diagnostico-definitivo.dto';
import { UpdateDiagnosticoDefinitivoDto } from './dto/update-diagnostico-definitivo.dto';

@Controller('diagnostico-definitivo')
export class DiagnosticoDefinitivoController {
  constructor(private readonly diagnosticoDefinitivoService: DiagnosticoDefinitivoService) {}

  @Post('create')
  crearDiagnosticoDefinitivo(@Body() createDiagnosticoDefinitivoDto: CreateDiagnosticoDefinitivoDto) {
    return this.diagnosticoDefinitivoService.crearDiagnosticoDefinitivo(createDiagnosticoDefinitivoDto);
  }

  @Get()
  obtenerDiagnosticosDefinitivos() {
    return this.diagnosticoDefinitivoService.obtenerDiagnosticosDefinitivos();
  }

  @Get('deleted')
  obtenerDiagnosticosDefinitivosEliminados() {
    return this.diagnosticoDefinitivoService.obtenerDiagnosticosDefinitivos();
  }

  @Get('search/:id')
  buscarDiagnosticoDefinitivoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticoDefinitivoService.buscarDiagnosticoDefinitivoPorId(id);
  }

  @Put('update:id')
  actualizarDiagnosticoDefinitivo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDiagnosticoDefinitivoDto: UpdateDiagnosticoDefinitivoDto,
  ) {
    return this.diagnosticoDefinitivoService.actualizarDiagnosticoDefinitivo(id, updateDiagnosticoDefinitivoDto);
  }

  @Delete('delete/:id')
  eliminarDiagnosticoDefinitivo(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticoDefinitivoService.eliminarDiagnosticoDefinitivo(id);
  }

  @Patch('restore/:id')
  restaurarDiagnosticoDefinitivo(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticoDefinitivoService.restaurarDiagnosticoDefinitivo(id);
  }
}
