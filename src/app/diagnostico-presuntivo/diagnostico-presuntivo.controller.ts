import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DiagnosticoPresuntivoService } from './diagnostico-presuntivo.service';
import { CreateDiagnosticoPresuntivoDto } from './dto/create-diagnostico-presuntivo.dto';
import { UpdateDiagnosticoPresuntivoDto } from './dto/update-diagnostico-presuntivo.dto';

@Controller('diagnostico-presuntivo')
export class DiagnosticoPresuntivoController {
  constructor(private readonly diagnosticoPresuntivoService: DiagnosticoPresuntivoService) {}

  @Post('create')
  crearDiagnosticoPresuntivo(@Body() createDiagnosticoPresuntivoDto: CreateDiagnosticoPresuntivoDto) {
    return this.diagnosticoPresuntivoService.crearDiagnosticoPresuntivo(createDiagnosticoPresuntivoDto);
  }

  @Get()
  obtenerDiagnosticosPresuntivos() {
    return this.diagnosticoPresuntivoService.obtenerDiagnosticosPresuntivos();
  }

  @Get('deleted')
  obtenerDiagnosticosPresuntivosEliminados() {
    return this.diagnosticoPresuntivoService.obtenerDiagnosticosPresuntivosEliminados();
  }

  @Get('search/:id')
  buscarDiagnosticoPresuntivoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticoPresuntivoService.buscarDiagnosticoPresuntivoPorId(id);
  }

  @Patch('update/:id')
  actualizarDiagnosticoPresuntivo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDiagnosticoPresuntivoDto: UpdateDiagnosticoPresuntivoDto,
  ) {
    return this.diagnosticoPresuntivoService.actualizarDiagnosticoPresuntivo(id, updateDiagnosticoPresuntivoDto);
  }

  @Delete('delete/:id')
  eliminarDiagnosticoPresuntivo(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticoPresuntivoService.eliminarDiagnosticoPresuntivo(id);
  }

  @Patch('restore/:id')
  restaurarDiagnosticoPresuntivo(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticoPresuntivoService.restaurarDiagnosticoPresuntivo(id);
  }
}
