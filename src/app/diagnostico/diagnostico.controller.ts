import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DiagnosticoService } from './diagnostico.service';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dto/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';

@Controller('diagnostico')
export class DiagnosticoController {
    constructor(private diagnosticoService: DiagnosticoService){}

    @Post()
    createDiag(@Body() newDiag:CreateDiagnosticoDto){
      return this.diagnosticoService.createDiagnostico(newDiag)
    }

    @Get()
    getListDiag(): Promise<Diagnostico[]>{
      return this.diagnosticoService.getListDiagnostico();
    }

    @Get(':id')
    getDiag(@Param('id', ParseIntPipe) id: number){
        return this.diagnosticoService.getDiagnostico(id)
    }

    @Delete(':id')
    deleteDiag(@Param('id', ParseIntPipe) id: number){
        return this.diagnosticoService.deleteDiagnostico(id)
    }

    @Patch(':id')
    updateDiag(@Param('id', ParseIntPipe) id: number, @Body() diadDto: UpdateDiagnosticoDto){
        return this.diagnosticoService.updateDiagnostico(id, diadDto)
    }
    @Get('codigo/:Codigo')
    getDiagByCodigo(@Param('Codigo', ParseIntPipe) codigo: number) {
      return this.diagnosticoService.getdiagnosticoByCodigo(codigo);
    }
}
