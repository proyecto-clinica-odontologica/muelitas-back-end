import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PacienteService } from './paciente.service';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post('create')
  registrarPaciente(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.registrarPaciente(createPacienteDto);
  }

  @Get()
  obtenerPacientes() {
    return this.pacienteService.obtenerPacientes();
  }

  @Get('deleted')
  obtenerPacientesEliminados() {
    return this.pacienteService.obtenerPacientesEliminados();
  }

  @Get('search/id/:id')
  buscarPacientePorId(@Param('id', ParseIntPipe) id: number) {
    return this.pacienteService.buscarPacientePorId(id);
  }

  @Patch('update/:id')
  actualizarPaciente(@Param('id', ParseIntPipe) id: number, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacienteService.actualizarPaciente(+id, updatePacienteDto);
  }

  @Delete('delete/:id')
  eliminarPaciente(@Param('id', ParseIntPipe) id: number) {
    return this.pacienteService.eliminarPaciente(id);
  }

  @Patch('restore/:id')
  restaurarPaciente(@Param('id', ParseIntPipe) id: number) {
    return this.pacienteService.restaurarPaciente(id);
  }
}
