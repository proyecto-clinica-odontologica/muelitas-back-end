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
import { UpdateClaseDto } from './dto/update-clase.dto';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Post()
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

  @Patch(':id')
  actualizarClase(
    @Param('id') id: string,
    @Body() updateClaseDto: UpdateClaseDto,
  ) {
    return this.clasesService.actualizarClase(+id, updateClaseDto);
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
