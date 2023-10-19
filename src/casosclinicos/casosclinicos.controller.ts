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

@Controller('casosclinicos')
export class CasosclinicosController {}


  import { CreateCasoclinicoDto } from './dto/create-casoclinico.dto';
  import { UpdateCasoclinicoDto } from './dto/update-casoclinico.dto';
  import { CasosclinicosService } from './casosclinicos.service';
  
  @Controller('estudiantes')
  export class EstudiantesController {
    constructor(private readonly casosclinicosService: CasosclinicosService) {}
  
    @Post()
    registrarEstudiante(@Body() createCasoclinicoDto: CreateCasoclinicoDto) {
      return this.casosclinicosService.registrarCasoclinico(createCasoclinicoDto);
    }
  
    @Get()
    obtenerEstudiantes() {
      return this.casosclinicosService.obtenerCasosclinicos();
    }
  
    @Get(':id')
    buscarUnEstudiante(@Param('id') id: string) {
      return this.casosclinicosService.buscarUnCasoclinico(+id);
    }
  
    @Patch(':id')
    actualizarUnEstudiante(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCasoclinicoDto: UpdateCasoclinicoDto,
    ) {
      return this.casosclinicosService.actualizarUnCasoclinico(
        id,
        updateCasoclinicoDto,
      );
    }
  
    @Delete(':id')
    eliminarUnEstudiante(@Param('id', ParseIntPipe) id: number) {
      return this.casosclinicosService.eliminarUnCasoclinico(id);
    }
  
    @Patch('restaurar-casoclinico/:id')
    restaurarUnCasoclinico(@Param('id', ParseIntPipe) id: number) {
      return this.casosclinicosService.restaurarUnCasoclinico(id);
    }
  }