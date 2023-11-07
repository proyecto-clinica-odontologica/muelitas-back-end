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
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { PeriodosService } from './periodos.service';

@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) {}

  @Post()
  registrarPeriodo(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodosService.registrarPeriodo(createPeriodoDto);
  }

  @Get()
  obtenerPeriodos() {
    return this.periodosService.obtenerPeriodos();
  }

  @Get('eliminados')
  obtenerPeriodosEliminados() {
    return this.periodosService.obtenerPeriodosEliminados();
  }

  @Get('search/id/:id')
  buscarPeriodoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.periodosService.buscarPeriodoPorId(id);
  }

  @Get('search/nombre/:nombrePeriodo')
  buscarPeriodoPorNombre(@Param('nombrePeriodo') nombrePeriodo: string) {
    return this.periodosService.buscarPeriodoPorNombre(nombrePeriodo);
  }

  @Get('search/sede/:idSede')
  buscarPeriodosPorSede(@Param('idSede') idSede: string) {
    return this.periodosService.buscarPeriodosPorSede(idSede);
  }

  @Patch(':id')
  actualizarPeriodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeriodoDto: UpdatePeriodoDto,
  ) {
    return this.periodosService.actualizarPeriodo(id, updatePeriodoDto);
  }

  @Delete(':id')
  eliminarPeriodo(@Param('id', ParseIntPipe) id: number) {
    return this.periodosService.eliminarPeriodo(id);
  }

  @Patch('restaurar/:id')
  restaurarPeriodo(@Param('id', ParseIntPipe) id: number) {
    return this.periodosService.restaurarPeriodo(id);
  }
}
