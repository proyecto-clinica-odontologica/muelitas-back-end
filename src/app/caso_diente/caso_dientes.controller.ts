import { Controller, Post, Get, Body  } from '@nestjs/common';
import { CreateCasoDienteDto } from './dto/create-caso-diente.dto';
import { CasoDienteService } from './caso_dientes.service';

@Controller('casodientes')
export class CasoDienteController {
    constructor(
        private casoDienteService: CasoDienteService
    ){}

    @Post()
    createCasoDiente(@Body() casoDiente: CreateCasoDienteDto){
        return this.casoDienteService.createCasoDiente(casoDiente)
    }

    @Get()
    GetCasoDiente(){
        return this.casoDienteService.getCasoDiente()
    }
}
