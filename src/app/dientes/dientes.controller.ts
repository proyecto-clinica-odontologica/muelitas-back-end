import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { DientesService } from './dientes.service';
import { Diente } from './diente.entity';
import { CreateDienteDto } from './dto/create-diente.dto';
import { UpdateDienteDto } from './dto/update-diente.dto';

@Controller('dientes')
export class DientesController {
     // Nos ayuda a conectar nuestros controladores con nuestros servicios
     constructor(private dientesService:DientesService){} 

     @Get()
     getDientes(): Promise<Diente[]>{
         return this.dientesService.geDientes();      // Usamos el servicio 'getUsuarios' y lo retornamos 
     }
 
     @Get(':idDiente')
     getDiente(@Param('idDiente', ParseIntPipe) id:number){     // 'ParseIntPipe' Transforma a un numero entero 
         
         return this.dientesService.getDiente(id);      // Usamos el servicio 'getUsuarios' y lo retornamos 
     }
 
     @Post()
     createDientes(@Body() nuevoUsuario:CreateDienteDto){       
         return this.dientesService.createDiente(nuevoUsuario); // usamos el servicio 'createUsuario' y lo retornamos
     }

     @Delete(':idDiente')
    deleteDiente(@Param('idDiente', ParseIntPipe) id:number){
        return this.dientesService.deleteDiente(id);
    }

    @Patch(':idDiente')
    updateDiente(@Param('idDiente', ParseIntPipe) id: number, @Body()
    Diente: UpdateDienteDto){
        return this.dientesService.updateDiente(id,Diente)
    }
}
