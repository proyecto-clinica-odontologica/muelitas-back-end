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

@Controller('subcasoclinico')
export class CasosclinicosController {}
  import { CreateSubCasoclinicoDto } from './dto/create-subcasoclinico.dto';
  import { UpdateSubCasoclinicoDto } from './dto/update-subcasoclinico.dto';
  import { SubcasoclinicoService } from './subcasoclinico.service';
  
  @Controller('estudiantes')
  export class SubcasoclinicoController {
    constructor(private readonly subcasosclinicosService: SubcasoclinicoService) {}
  
    @Post()
    registrarEstudiante(@Body() createSubCasoclinicoDto: CreateSubCasoclinicoDto) {
      return this.subcasosclinicosService.registrarsubCasoclinico(createSubCasoclinicoDto);
    }
  
    @Get()
    obtenerEstudiantes() {
      return this.subcasosclinicosService.obtenersubCasosclinicos();
    }
  
    @Get(':id')
    buscarUnEstudiante(@Param('id') id: string) {
      return this.subcasosclinicosService.buscarUnsubCasoclinico(+id);
    }
  
    @Patch(':id')
    actualizarUnEstudiante(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCasoclinicoDto: UpdateSubCasoclinicoDto,
    ) {
      return this.subcasosclinicosService.actualizarsubUnCasoclinico(
        id,
        updateCasoclinicoDto,
      );
    }
  
    @Delete(':id')
    eliminarUnEstudiante(@Param('id', ParseIntPipe) id: number) {
      return this.subcasosclinicosService.eliminarUnsubCasoclinico(id);
    }
  
    @Patch('restaurar-casoclinico/:id')
    restaurarUnCasoclinico(@Param('id', ParseIntPipe) id: number) {
      return this.subcasosclinicosService.restaurarUnsubCasoclinico(id);
    }
  }