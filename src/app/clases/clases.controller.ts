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
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/create-clase.dto';

@Controller('clase')
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

  @Delete(':id')
  eliminarClase(@Param('id') id: string) {
    return this.clasesService.eliminarClase(+id);
  }

  @Patch('restaurar/:id')
  restaurarClase(@Param('id') id: string) {
    return this.clasesService.restaurarClase(+id);
  }
//! DESDE ACA
  @Get('/periodo/:idPeriodo')
  obtenerClasesPorPeriodo(@Param('idPeriodo', ParseIntPipe) idPeriodo: number) {
    return this.clasesService.obtenerClasesPorPeriodo(idPeriodo);
  }

  @Get('/periodo-docente/:idDocente/:idPeriodo')
  obtenerClasesPorPeriodoDocente(
    @Param('idDocente', ParseIntPipe) idDocente: number,
    @Param('idPeriodo', ParseIntPipe) idPeriodo: number,
  ) {
    return this.clasesService.obtenerClasesPorPeriodoDocente(
      idDocente,
      idPeriodo,
    );
  }

  @Get('/periodo-docente-curso/:idDocente/:idPeriodo/:idCurso')
  obtenerClasesPorPeriodoDocenteCurso(
    @Param('idDocente', ParseIntPipe) idDocente: number,
    @Param('idPeriodo', ParseIntPipe) idPeriodo: number,
    @Param('idCurso', ParseIntPipe) idCurso: number,
  ) {
    return this.clasesService.obtenerClasesPorPeriodoDocenteCurso(
      idDocente,
      idPeriodo,
      idCurso,
    );
  }
}
