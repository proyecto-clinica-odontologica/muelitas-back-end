import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Post('create')
  crearAnamnesis(@Body() createAnamnesisDto: CreateAnamnesisDto) {
    return this.anamnesisService.crearAnamnesis(createAnamnesisDto);
  }

  @Get()
  obtenerAnamnesis() {
    return this.anamnesisService.obtenerAnamnesis();
  }

  @Get('deleted')
  obtenerAnamnesisEliminados() {
    return this.anamnesisService.obtenerAnamnesisEliminados();
  }

  @Get('search/:id')
  buscarAnamnesisPorId(@Param('id', ParseIntPipe) id: number) {
    return this.anamnesisService.buscarAnamnesisPorId(id);
  }

  @Put('update/:id')
  actualizarAnamnesis(@Param('id', ParseIntPipe) id: number, @Body() updateAnamnesisDto: UpdateAnamnesisDto) {
    return this.anamnesisService.actualizarAnamnesis(id, updateAnamnesisDto);
  }

  @Delete('delete/:id')
  eliminarAnamnesis(@Param('id', ParseIntPipe) id: number) {
    return this.anamnesisService.eliminarAnamnesis(id);
  }

  @Patch('restore/:id')
  restaurarAnamnesis(@Param('id', ParseIntPipe) id: number) {
    return this.anamnesisService.restaurarAnamnesis(id);
  }
}
