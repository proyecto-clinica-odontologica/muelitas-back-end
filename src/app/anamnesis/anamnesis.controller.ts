import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';
import { Anamnesis } from './entities/anamnesis.entity';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(private anamnesisService: AnamnesisService){}

    @Post()
    createAnamnesis(@Body() newAnamnesis:CreateAnamnesisDto){
      return this.anamnesisService.createAnamnesis(newAnamnesis)
    }

    @Get()
    getListAnamnesis(): Promise<Anamnesis[]>{
      return this.anamnesisService.getListAnamnesis();
    }

    @Get(':id')
    getAnamnesis(@Param('id', ParseIntPipe) id: number){
        return this.anamnesisService.getAnamnesis(id)
    }

    @Delete(':id')
    deleteAnamnesis(@Param('id', ParseIntPipe) id: number){
        return this.anamnesisService.deleteAnamnesis(id)
    }

    @Patch(':id')
    updateAnamnesis(@Param('id', ParseIntPipe) id: number, @Body() anamnesis: UpdateAnamnesisDto){
        return this.anamnesisService.updateAnamnesis(id, anamnesis)
    }
    @Get('paciente/:id')
    getAnamnesisByPaciente(@Param('id', ParseIntPipe) id: number) {
      return this.anamnesisService.getAnamnesisByPaciente(id);
    }
}
