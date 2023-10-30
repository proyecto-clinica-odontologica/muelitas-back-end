import { Controller, Post, Body, Get, Delete, Patch, ParseIntPipe, Param } from '@nestjs/common';
import { AnivelPiezaService } from './anivel-pieza.service';
import { AnivelPieza } from './entity/anivel-pieza.entity';
import { CreatAnivelPiezaDto } from './dto/create-anivel-pieza.dto';
import { UpdateAnivelPiezaDto } from './dto/update-anivel-pieza.dto';

@Controller('anivel_pieza')
export class AnivelPiezaController {

    constructor(private anivelPiezaService:AnivelPiezaService){}

    @Get()
    getAnivelPiezas(): Promise<AnivelPieza[]>{
        return this.anivelPiezaService.getAnivelPiezas();
    }

    @Get(':idAnivelPieza')
    getAnivelPieza(@Param('idAnivelPieza', ParseIntPipe) id:number){
        return this.anivelPiezaService.getAnivelPieza(id);
    }

    @Post()
    createAnivelPiezas(@Body() nuevoNivelPieza:CreatAnivelPiezaDto){
        return this.anivelPiezaService.createAnivelPieza(nuevoNivelPieza);
    }

    @Delete(':idAnivelPieza')
    deleteAnivelPieza(@Param('idAnivelPieza', ParseIntPipe) id:number){
        return this.anivelPiezaService.deleteAnivelPieza(id);
    }

    @Patch(':idAnivelPieza')
    updateAnivelPieza(@Param('idAnivelPieza', ParseIntPipe) id:number, 
    @Body() NivelPieza: UpdateAnivelPiezaDto){
        return this.anivelPiezaService.updateAnivelPieza(id, NivelPieza)
    }
}   
