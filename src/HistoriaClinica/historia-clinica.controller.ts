/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinica } from './dto/historia-clinica.entity';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Controller('HistoriaClinica')
export class HistoriaClinicaController {

  constructor(private historiaClinicaService: HistoriaClinicaService) {}

  @Get()
  getHistoriasClinicas(): Promise<HistoriaClinica[]> {
    return this.historiaClinicaService.getHistoriasClinicas();
  }

  @Get(':id')
  getHistoriaClinica(@Param('id', ParseIntPipe) id: number) {
    return this.historiaClinicaService.getHistoriaClinica(id);
  }

  @Post()
  createHistoriaClinica(@Body() nuevaHistoriaClinica: CreateHistoriaClinicaDto) {
    return this.historiaClinicaService.createHistoriaClinica(nuevaHistoriaClinica);
  }

  @Delete(':id')
  deleteHistoriaClinica(@Param('id', ParseIntPipe) id: number) {
    return this.historiaClinicaService.deleteHistoriaClinica(id);
  }

  @Patch(':id')
  updateHistoriaClinica(@Param('id', ParseIntPipe) id: number, @Body() historiaClinica: UpdateHistoriaClinicaDto) {
    return this.historiaClinicaService.updateHistoriaClinica(id, historiaClinica);
  }
}