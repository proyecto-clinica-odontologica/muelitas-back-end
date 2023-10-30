import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DiagnosticopresuntivoService } from './diagnosticopresuntivo.service';
import { CreateDiagnosticopresuntivoDto } from './dto/create-diagnosticopresuntivo.dto';
import { UpdateDiagnosticopresuntivoDto } from './dto/update-diagnosticopresuntivo.dto';
import { Diagnosticopresuntivo } from './entities/diagnosticopresuntivo.entity';

@Controller('diagnosticopresuntivo')
export class DiagnosticopresuntivoController {
  constructor(private diagnosticopresuntivoService: DiagnosticopresuntivoService){}

    @Post()
    createDiagPresun(@Body() newDiagPresun:CreateDiagnosticopresuntivoDto){
      return this.diagnosticopresuntivoService.createDiagPresun(newDiagPresun)
    }

    @Get()
    getListDiagPresun(): Promise<Diagnosticopresuntivo[]>{
      return this.diagnosticopresuntivoService.getListDiagPresun();
    }

    @Get(':id')
    getDiagPresun(@Param('id', ParseIntPipe) id: number){
        return this.diagnosticopresuntivoService.getDiagPresun(id)
    }

    @Delete(':id')
    deleteDiagPresun(@Param('id', ParseIntPipe) id: number){
        return this.diagnosticopresuntivoService.deleteDiagPresun(id)
    }

    @Patch(':id')
    updateDiagPresun(@Param('id', ParseIntPipe) id: number, @Body() DiagPresun: UpdateDiagnosticopresuntivoDto){
        return this.diagnosticopresuntivoService.updateDiagPresun(id, DiagPresun)
    }
    @Get('paciente/:id')
    getDiagPresunByPaciente(@Param('id', ParseIntPipe) id: number) {
      return this.diagnosticopresuntivoService.getDiagPresunByPaciente(id);
    }
}
