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

  @Get(':id')
  obtenerUnDocente(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.obtenerUnDocente(id);
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
