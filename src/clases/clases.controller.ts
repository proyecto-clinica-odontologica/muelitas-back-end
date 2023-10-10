import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/create-clase.dto';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Post('create')
  registrarClase(@Body() createClaseDto: CreateClaseDto) {
    return this.clasesService.registrarClase(createClaseDto);
  }

  @Get()
  obtenerClases() {
    return this.clasesService.obtenerClases();
  }

  @Get('search/id/:id')
  buscarClasePorId(@Param('id') id: number) {
    return this.clasesService.buscarClasePorId(id);
  }

  @Get('search/clase/:nombreClase')
  buscarClasePorNombre(@Param('nombreClase') nombreClase: string) {
    return this.clasesService.buscarClasePorNombre(nombreClase);
  }

  @Get('periodo/:nombrePeriodo')
  BuscarClasePorPeriodo(@Param('nombrePeriodo') nombrePeriodo: string) {
    return this.clasesService.BuscarClasePorPeriodo(nombrePeriodo);
  }

  @Get('periodo-docente/:nombreDocente/:nombrePeriodo')
  BuscarClasePorPeriodoDocente(
    @Param('nombreDocente') nombreDocente: string,
    @Param('nombrePeriodo') nombrePeriodo: string,
  ) {
    return this.clasesService.BuscarClasePorPeriodoDocente(
      nombreDocente,
      nombrePeriodo,
    );
  }

  @Get('periodo-docente-curso/:nombreDocente/:nombrePeriodo/:nombreCurso')
  BuscarClasePorPeriodoDocenteCurso(
    @Param('nombreDocente') nombreDocente: string,
    @Param('nombrePeriodo') nombrePeriodo: string,
    @Param('nombreCurso') nombreCurso: string,
  ) {
    return this.clasesService.BuscarClasePorPeriodoDocenteCurso(
      nombreDocente,
      nombrePeriodo,
      nombreCurso,
    );
  }

  @Delete(':id')
  eliminarClase(@Param('id') id: string) {
    return this.clasesService.eliminarClase(+id);
  }

  @Patch('restaurar/:id')
  restaurarClase(@Param('id') id: string) {
    return this.clasesService.restaurarClase(+id);
  }
}
