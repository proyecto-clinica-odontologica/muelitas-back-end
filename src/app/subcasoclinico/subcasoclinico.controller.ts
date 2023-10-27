import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateSubCasoclinicoDto } from './dto/create-subcasoclinico.dto';
import { UpdateSubCasoclinicoDto } from './dto/update-subcasoclinico.dto';
import { SubcasoclinicoService } from './subcasoclinico.service';

@Controller('subcaso-clinico')
export class SubcasoclinicoController {
  constructor(private readonly subcasosclinicosService: SubcasoclinicoService) {}

  @Post()
  registrarsubCasoclinico(@Body() createSubCasoclinicoDto: CreateSubCasoclinicoDto) {
    return this.subcasosclinicosService.registrarsubCasoclinico(createSubCasoclinicoDto);
  }

  @Get()
  obtenersubCasosclinicos() {
    return this.subcasosclinicosService.obtenersubCasosclinicos();
  }

  @Get(':id')
  buscarUnsubCasoclinico(@Param('id') id: string) {
    return this.subcasosclinicosService.buscarUnsubCasoclinico(+id);
  }

  @Patch(':id')
  actualizarsubUnCasoclinico(@Param('id', ParseIntPipe) id: number, @Body() updateCasoclinicoDto: UpdateSubCasoclinicoDto) {
    return this.subcasosclinicosService.actualizarsubUnCasoclinico(id, updateCasoclinicoDto);
  }

  @Delete(':id')
  eliminarUnsubCasoclinico(@Param('id', ParseIntPipe) id: number) {
    return this.subcasosclinicosService.eliminarUnsubCasoclinico(id);
  }

  @Patch('restaurar-casoclinico/:id')
  restaurarUnsubCasoclinico(@Param('id', ParseIntPipe) id: number) {
    return this.subcasosclinicosService.restaurarUnsubCasoclinico(id);
  }
}
