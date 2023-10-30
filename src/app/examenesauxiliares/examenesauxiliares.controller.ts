import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExamenesauxiliaresService } from './examenesauxiliares.service';
import { CreateExamenesauxiliareDto } from './dto/create-examenesauxiliare.dto';
import { UpdateExamenesauxiliareDto } from './dto/update-examenesauxiliare.dto';
import { Examenesauxiliare } from './entities/examenesauxiliare.entity';

@Controller('examenesauxiliares')
export class ExamenesauxiliaresController {
  constructor(private examenesauxService: ExamenesauxiliaresService){}

    @Post()
    createExamenaux(@Body() newExamenaux:CreateExamenesauxiliareDto){
      return this.examenesauxService.createexamenesaux(newExamenaux)
    }

    @Get()
    getListExamenaux(): Promise<Examenesauxiliare[]>{
      return this.examenesauxService.getListexamenesaux();
    }

    @Get(':id')
    getExamenaux(@Param('id', ParseIntPipe) id: number){
        return this.examenesauxService.getexamenesaux(id)
    }

    @Delete(':id')
    deleteExamenaux(@Param('id', ParseIntPipe) id: number){
        return this.examenesauxService.deleteexamenesaux(id)
    }

    @Patch(':id')
    updateExamenaux(@Param('id', ParseIntPipe) id: number, @Body() Examenaux: UpdateExamenesauxiliareDto){
        return this.examenesauxService.updateexamenesaux(id, Examenaux)
    }
    @Get('paciente/:id')
    getExamenauxByPaciente(@Param('id', ParseIntPipe) id: number) {
      return this.examenesauxService.getexamenesauxByPaciente(id);
    }
}
