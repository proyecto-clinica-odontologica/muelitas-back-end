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
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { IntegrantesService } from './integrantes.service';

@Controller('integrantes')
export class IntegrantesController {
  constructor(private readonly integrantesService: IntegrantesService) {}

  @Post('create')
  registrarIntegrantes(@Body() createIntegranteDto: CreateIntegranteDto) {
    return this.integrantesService.registrarIntegrantes(createIntegranteDto);
  }

  @Get()
  obtenerIntegrantes() {
    return this.integrantesService.obtenerIntegrantes();
  }

  @Get('eliminados')
  obtenerIntegrantesEliminados() {
    return this.integrantesService.obtenerIntegrantesEliminados();
  }

  @Get('search/id/:id')
  buscarIntegrantePorId(@Param('id', ParseIntPipe) id: number) {
    return this.integrantesService.buscarIntegrantePorId(+id);
  }

  @Patch(':id')
  actualizarIntegrante(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIntegranteDto: UpdateIntegranteDto,
  ) {
    return this.integrantesService.actualizarIntegrante(
      +id,
      updateIntegranteDto,
    );
  }

  @Delete(':id')
  eliminarIntegrante(@Param('id', ParseIntPipe) id: number) {
    return this.integrantesService.eliminarIntegrante(+id);
  }

  @Patch('restaurar/:id')
  restaurarIntegrante(@Param('id', ParseIntPipe) id: number) {
    return this.integrantesService.restaurarIntegrante(+id);
  }
}
