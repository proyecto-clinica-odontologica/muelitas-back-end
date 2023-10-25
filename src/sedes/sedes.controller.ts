import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { SedesService } from './sedes.service';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Post('create')
  registrarSede(@Body() createSedeDto: CreateSedeDto) {
    return this.sedesService.registrarSede(createSedeDto);
  }

  @Get()
  obtenerSedes() {
    return this.sedesService.obtenerSedes();
  }

  @Get('eliminados')
  obtenerSedesEliminadas() {
    return this.sedesService.obtenerSedesEliminadas();
  }

  @Get('search/id/:id')
  buscarSedePorId(@Param('id', ParseIntPipe) id: number) {
    return this.sedesService.buscarSedePorId(id);
  }

  @Get('search/nombre/:nombreSede')
  buscarSedePorNombre(@Param('nombreSede') nombreSede: string) {
    return this.sedesService.buscarSedePorNombre(nombreSede);
  }

  @Get('empresa/:idEmpresa')
  buscarSedesPorEmpresa(@Param('idEmpresa') idEmpresa: number) {
    return this.sedesService.buscarSedesPorEmpresa(idEmpresa);
  }

  @Put('update/:id')
  actualizarSede(@Param('id', ParseIntPipe) id: number, @Body() updateSedeDto: UpdateSedeDto) {
    return this.sedesService.actualizarSede(id, updateSedeDto);
  }

  @Delete(':id')
  eliminarSede(@Param('id', ParseIntPipe) id: number) {
    return this.sedesService.eliminarSede(id);
  }

  @Patch('restaurar/:id')
  restaurarSede(@Param('id', ParseIntPipe) id: number) {
    return this.sedesService.restaurarSede(id);
  }
}
