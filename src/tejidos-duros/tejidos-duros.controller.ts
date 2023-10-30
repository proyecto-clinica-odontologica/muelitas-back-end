import { Controller, Post, Body, Get, Delete, Patch, ParseIntPipe, Param  } from '@nestjs/common';
import { TejidosDurosService } from './tejidos-duros.service';
import { TejidoDuro } from './entity/tejido-duro.entity';
import { UpdateTejidosDurosDto } from './dto/update-tejidos-duros.dto';
import { CreateTejidosDurosDto } from './dto/create-tejidos-duros.dto';

@Controller('tejidos-duros')
export class TejidosDurosController {

    constructor(private tejidosDurosService:TejidosDurosService){}

    @Get()
    getTejidosDuros(): Promise<TejidoDuro[]>{
        return this.tejidosDurosService.getTejidosDuros();
    }

    @Get(':idTejidoDuro')
    getTejidoDuro(@Param('idTejidoDuro', ParseIntPipe) id:number){
        return this.tejidosDurosService.getTejidoDuro(id);
    }

    @Post()
    createTejidoDuro(@Body() nuevoTejidoDuro:CreateTejidosDurosDto){
        return this.tejidosDurosService.createTejidoDuro(nuevoTejidoDuro);
    }

    @Delete(':idTejidoDuro')
    deleteTejidoDuro(@Param('idTejidoDuro', ParseIntPipe) id:number){
        return this.tejidosDurosService.deleteTejidoDuro(id);
    }

    @Patch(':idTejidoDuro')
    updateTejidoDuro(@Param('idTejidoDuro', ParseIntPipe) id:number, 
    @Body() TejidoDuro: UpdateTejidosDurosDto){
        return this.tejidosDurosService.updateTejidoDuro(id, TejidoDuro)
    }
}
