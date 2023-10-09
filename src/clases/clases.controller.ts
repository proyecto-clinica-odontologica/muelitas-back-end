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

  @Get(':id')
  BuscarUnaClase(@Param('id') id: string) {
    return this.clasesService.BuscarUnaClase(+id);
  }

  @Get('periodo/:id')
  BuscarClasePorPeriodo(@Param('id') id: string) {
    return this.clasesService.BuscarClasePorPeriodo(id);
  }

  @Get('periodo-docente/:idDocente/:idPeriodo')
  BuscarClasePorPeriodoDocente(
    @Param('idDocente') idDocente: number,
    @Param('idPeriodo') idPeriodo: number,
  ) {
    return this.clasesService.BuscarClasePorPeriodoDocente(
      idDocente,
      idPeriodo,
    );
  }

  @Get('periodo-docente-curso/:idDocente/:idPeriodo/:idCurso')
  BuscarClasePorPeriodoDocenteCurso(
    @Param('idDocente') idDocente: number,
    @Param('idPeriodo') idPeriodo: number,
    @Param('idCurso') idCurso: number,
  ) {
    return this.clasesService.BuscarClasePorPeriodoDocenteCurso(
      idDocente,
      idPeriodo,
      idCurso,
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
