import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InterpretacionradiograficaService } from './interpretacionradiografica.service';
import { CreateInterpRadDto } from './dto/create-interprad.dto';
import { UpdateInterpRadDto } from './dto/update-interprad.dto';
import { InterpRad } from './entities/interprad.entity';
@Controller('interpretacionradiografica')
export class InterpretacionradiograficaController {
    constructor(private interpRadService: InterpretacionradiograficaService){}

    @Post()
    createInterpRad(@Body() newInterpRad:CreateInterpRadDto){
      return this.interpRadService.createInterpRad(newInterpRad)
    }

    @Get()
    getListInterpRad(): Promise<InterpRad[]>{
      return this.interpRadService.getListInterpRad();
    }

    @Get(':id')
    getInterpRad(@Param('id', ParseIntPipe) id: number){
        return this.interpRadService.getInterpRad(id)
    }

    @Delete(':id')
    deleteInterpRad(@Param('id', ParseIntPipe) id: number){
        return this.interpRadService.deleteInterpRad(id)
    }

    @Patch(':id')
    updateInterpRad(@Param('id', ParseIntPipe) id: number, @Body() interpRadDto: UpdateInterpRadDto){
        return this.interpRadService.updateInterpRad(id, interpRadDto)
    }
    @Get('cirugia/:Cirugia')
    getInterpRadByCirugia(@Param('Cirugia', ParseIntPipe) cirugia: number) {
      return this.interpRadService.getInterpRadByCirugia(cirugia);
    }
}
