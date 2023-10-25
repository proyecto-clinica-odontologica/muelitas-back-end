import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresasService } from './empresas.service';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post('create')
  registrarEmpresa(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.registrarEmpresa(createEmpresaDto);
  }

  @Get()
  obtenerEmpresas() {
    return this.empresasService.obtenerEmpresas();
  }

  @Get('eliminados')
  obtenerEmpresasEliminadas() {
    return this.empresasService.obtenerEmpresasEliminadas();
  }

  @Get(':id')
  buscarEmpresaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.empresasService.buscarEmpresaPorId(id);
  }

  @Get('search/nombre/:nombreEmpresa')
  buscarEmpresaPorNombre(@Param('nombreEmpresa') nombreEmpresa: string) {
    return this.empresasService.buscarEmpresaPorNombre(nombreEmpresa);
  }

  @Get('search/ruc/:rucEmpresa')
  buscarEmpresaPorRuc(@Param('rucEmpresa') rucEmpresa: string) {
    return this.empresasService.buscarEmpresaPorRuc(rucEmpresa);
  }

  @Patch(':id')
  actualizarEmpresa(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.actualizarEmpresa(+id, updateEmpresaDto);
  }

  @Delete(':id')
  eliminarEmpresa(@Param('id') id: string) {
    return this.empresasService.eliminarEmpresa(+id);
  }

  @Patch('restaurar/:id')
  restaurarEmpresa(@Param('id') id: string) {
    return this.empresasService.restaurarEmpresa(+id);
  }
}
