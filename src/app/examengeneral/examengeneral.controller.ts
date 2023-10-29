import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExamengeneralService } from './examengeneral.service';
import { CreateExamengeneralDto } from './dto/create-examengeneral.dto';
import { UpdateExamengeneralDto } from './dto/update-examengeneral.dto';
import { ExamenGeneral } from './entities/examengeneral.entity';

@Controller('examengeneral')
export class ExamengeneralController {
  constructor(private examenesGenService: ExamengeneralService){}

    @Post()
    createExamenGen(@Body() newExamenGen:CreateExamengeneralDto){
      return this.examenesGenService.createexamenesGen(newExamenGen)
    }

    @Get()
    getListExamenGen(): Promise<ExamenGeneral[]>{
      return this.examenesGenService.getListexamenesGen();
    }

    @Get(':id')
    getExamenGen(@Param('id', ParseIntPipe) id: number){
        return this.examenesGenService.getexamenesGen(id)
    }

    @Delete(':id')
    deleteExamenGen(@Param('id', ParseIntPipe) id: number){
        return this.examenesGenService.deleteexamenesGen(id)
    }

    @Patch(':id')
    updateExamenGen(@Param('id', ParseIntPipe) id: number, @Body() ExamenGen: UpdateExamengeneralDto){
        return this.examenesGenService.updateexamenesGen(id, ExamenGen)
    }
    @Get(':id')
    getHistoriaClinicaByPaciente(@Param('id', ParseIntPipe) id: number) {
      return this.examenesGenService.getexamenesGenByPaciente(id);
    }
}
