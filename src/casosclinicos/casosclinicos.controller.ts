import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { CasosclinicosService } from './casosclinicos.service';
import { CreateCasoclinicoDto } from './dto/create-casoclinico.dto';
import { UpdateCasoclinicoDto } from './dto/update-casoclinico.dto';

@Controller('casos-clinicos')
export class CasosclinicosController {
  constructor(private readonly casosclinicosService: CasosclinicosService) {}

  @Post()
  registrarCasoclinico(@Body() createCasoclinicoDto: CreateCasoclinicoDto) {
    return this.casosclinicosService.registrarCasoclinico(createCasoclinicoDto);
  }

  @Get()
  obtenerCasosclinicos() {
    return this.casosclinicosService.obtenerCasosclinicos();
  }

  @Get(':id')
  buscarUnCasoclinico(@Param('id') id: string) {
    return this.casosclinicosService.buscarUnCasoclinico(+id);
  }

  @Patch(':id')
  actualizarUnCasoclinico(@Param('id', ParseIntPipe) id: number, @Body() updateCasoclinicoDto: UpdateCasoclinicoDto) {
    return this.casosclinicosService.actualizarUnCasoclinico(id, updateCasoclinicoDto);
  }

  @Delete(':id')
  eliminarUnCasoclinico(@Param('id', ParseIntPipe) id: number) {
    return this.casosclinicosService.eliminarUnCasoclinico(id);
  }

  @Patch('restaurar-casoclinico/:id')
  restaurarUnCasoclinico(@Param('id', ParseIntPipe) id: number) {
    return this.casosclinicosService.restaurarUnCasoclinico(id);
  }
}
