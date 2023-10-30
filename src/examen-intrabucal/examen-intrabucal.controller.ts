import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { ExamenIntrabucalService } from './examen-intrabucal.service';
import { ExamenIntrabucal } from './entity/examen-intrabucal.entity';
import { CreateExamenIntrabucalDto } from './dto/create-examen-intrabucal.dto';
import { UpdateExamenIntrabucalDto } from './dto/update-examen-intrabucal.dto';

@Controller('examen-intrabucal')
export class ExamenIntrabucalController {

    constructor(private examenIntrabucalServicio:ExamenIntrabucalService){} 

     @Get()
     getExamenIntrabucals(): Promise<ExamenIntrabucal[]>{
         return this.examenIntrabucalServicio.getExamenIntrabucals();      // Usamos el servicio 'getUsuarios' y lo retornamos 
     }
 
     @Get(':idExamenIntrabucal')
     getExamenIntrabucal(@Param('idExamenIntrabucal', ParseIntPipe) id:number){     // 'ParseIntPipe' Transforma a un numero entero 
         
         return this.examenIntrabucalServicio.getExamenIntrabucal(id);      // Usamos el servicio 'getUsuarios' y lo retornamos 
     }
 
     @Post()
     createExamenIntrabucal(@Body() nuevoExamenIntrabucal:CreateExamenIntrabucalDto){       
         return this.examenIntrabucalServicio.createExamenIntrabucal(nuevoExamenIntrabucal); // usamos el servicio 'createUsuario' y lo retornamos
     }

     @Delete(':idExamenIntrabucal')
    deleteExamenIntrabucal(@Param('idExamenIntrabucal', ParseIntPipe) id:number){
        return this.examenIntrabucalServicio.deleteExamenIntrabucal(id);
    }

    @Patch(':idExamenIntrabucal')
    updateExamenIntrabucal(@Param('idExamenIntrabucal', ParseIntPipe) id: number,
    @Body() ExamenIntrabucal: UpdateExamenIntrabucalDto){
        return this.examenIntrabucalServicio.updateExamenIntrabucal(id,ExamenIntrabucal)
    }
}
