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
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post('create')
  registrarCurso(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.registrarCurso(createCursoDto);
  }

  @Get()
  obtenerCursos() {
    return this.cursosService.obtenerCursos();
  }

  @Get('eliminados')
  obtenerCursosEliminados() {
    return this.cursosService.obtenerCursosEliminados();
  }

  @Get('search/id/:id')
  buscarCursoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.cursosService.buscarCursoPorId(id);
  }

  @Get('search/nombre/:nombre')
  buscarCursoPorNombre(@Param('nombre') nombre: string) {
    return this.cursosService.buscarCursoPorNombre(nombre);
  }

  @Patch(':id')
  actualizarCurso(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCursoDto: UpdateCursoDto,
  ) {
    return this.cursosService.actualizarCurso(id, updateCursoDto);
  }

  @Delete(':id')
  eliminarCurso(@Param('id', ParseIntPipe) id: number) {
    return this.cursosService.eliminarCurso(id);
  }

  @Patch('restaurar/:id')
  restaurarCurso(@Param('id', ParseIntPipe) id: number) {
    return this.cursosService.restaurarCurso(id);
  }
}
