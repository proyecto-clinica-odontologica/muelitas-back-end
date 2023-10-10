import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post('create')
  registrarDocente(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.registrarDocente(createDocenteDto);
  }

  @Get()
  ObtenerDocentes() {
    return this.docentesService.ObtenerDocentes();
  }

  @Get('eliminados')
  obtenerDocentesEliminados() {
    return this.docentesService.obtenerDocentesEliminados();
  }

  @Get('search/id/:id')
  buscarDocentePorId(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.buscarDocentePorId(id);
  }

  @Get('search/nombre/:nombre')
  buscarDocentePorNombre(@Param('nombre') nombre: string) {
    return this.docentesService.buscarDocentePorNombre(nombre);
  }

  @Patch(':id')
  actualizarDocente(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ) {
    return this.docentesService.actualizarDocente(id, updateDocenteDto);
  }

  @Delete(':id')
  eliminarDocente(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.eliminarDocente(id);
  }

  @Patch('restaurar-docente/:id')
  restaurarDocente(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.restaurarDocente(id);
  }
}
