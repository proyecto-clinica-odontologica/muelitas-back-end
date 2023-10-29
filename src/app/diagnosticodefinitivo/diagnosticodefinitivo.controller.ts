import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DiagnosticodefinitivoService } from './diagnosticodefinitivo.service';
import { CreateDiagnosticodefinitivoDto } from './dto/create-diagnosticodefinitivo.dto';
import { UpdateDiagnosticodefinitivoDto } from './dto/update-diagnosticodefinitivo.dto';
import { Diagnosticodefinitivo } from './entities/diagnosticodefinitivo.entity';

@Controller('diagnosticodefinitivo')
export class DiagnosticodefinitivoController {
  constructor(private diagnosticodefinitivoService: DiagnosticodefinitivoService){}

    @Post()
    createDiagdef(@Body() newDiagdef:CreateDiagnosticodefinitivoDto){
      return this.diagnosticodefinitivoService.createDiagdef(newDiagdef)
    }

    @Get()
    getListDiagdef(): Promise<Diagnosticodefinitivo[]>{
      return this.diagnosticodefinitivoService.getListDiagdef();
    }

    @Get(':id')
    getDiagdef(@Param('id', ParseIntPipe) id: number){
        return this.diagnosticodefinitivoService.getDiagdef(id)
    }

    @Delete(':id')
    deleteDiagdef(@Param('id', ParseIntPipe) id: number){
        return this.diagnosticodefinitivoService.deleteDiagdef(id)
    }

    @Patch(':id')
    updateDiagdef(@Param('id', ParseIntPipe) id: number, @Body() diagdefdto: UpdateDiagnosticodefinitivoDto){
        return this.diagnosticodefinitivoService.updateDiagdef(id, diagdefdto)
    }
    @Get(':id')
    getHistoriaClinicaByPaciente(@Param('id', ParseIntPipe) id: number) {
      return this.diagnosticodefinitivoService.getDiagdefByPaciente(id);
    }
}
