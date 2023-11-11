import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InformequirurgicoService } from './informequirurgico.service';
import { CreateInfQuirurgicoDto } from './dto/create-infquirurgico.dto';
import { UpdateInfQuirurgicoDto } from './dto/update-infquirurgico.dto';
import { InfQuirurgico } from './entities/infquirurgico.entity';

@Controller('informequirurgico')
export class InformequirurgicoController {
    constructor(private infQuirurgicoService: InformequirurgicoService){}

    @Post()
    createinfQuirurgico(@Body() newinfQuirurgico:CreateInfQuirurgicoDto){
      return this.infQuirurgicoService.createInfQuirurgico(newinfQuirurgico)
    }

    @Get()
    getListinfQuirurgico(): Promise<InfQuirurgico[]>{
      return this.infQuirurgicoService.getListInfQuirurgico();
    }

    @Get(':id')
    getinfQuirurgico(@Param('id', ParseIntPipe) id: number){
        return this.infQuirurgicoService.getInfQuirurgico(id)
    }

    @Delete(':id')
    deleteinfQuirurgico(@Param('id', ParseIntPipe) id: number){
        return this.infQuirurgicoService.deleteInfQuirurgico(id)
    }

    @Patch(':id')
    updateinfQuirurgico(@Param('id', ParseIntPipe) id: number, @Body() infQuirurgicoDto: UpdateInfQuirurgicoDto){
        return this.infQuirurgicoService.updateInfQuirurgico(id, infQuirurgicoDto)
    }
    @Get('cirugia/:Cirugia')
    getinfQuirurgicoByCirugia(@Param('Cirugia', ParseIntPipe) cirugia: number) {
      return this.infQuirurgicoService.getInfQuirurgicoByCirugia(cirugia);
    }
}
