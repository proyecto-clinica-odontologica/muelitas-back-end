import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { EstadoPostquirurgicoService } from './estado-postquirurgico.service';
import { CreateEstadoPostquirurgicoDto } from './dto/create-estado-postquirurgico.dto';
import { UpdateEstadoPostquirurgicoDto } from './dto/update-estado-postquirurgico.dto';

@Controller('estado-postquirurgico')
export class EstadoPostquirurgicoController {
  constructor(private readonly estadoPostquirurgicoService: EstadoPostquirurgicoService) {}

  @Post('create')
  create(@Body() createEstadoPostquirurgicoDto: CreateEstadoPostquirurgicoDto) {
    return this.estadoPostquirurgicoService.create(createEstadoPostquirurgicoDto);
  }

  @Get()
  findAll() {
    return this.estadoPostquirurgicoService.findAll();
  }

  @Get('deleted')
  findAllDelete() {
    return this.estadoPostquirurgicoService.findAllDelete();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estadoPostquirurgicoService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEstadoPostquirurgicoDto: UpdateEstadoPostquirurgicoDto) {
    return this.estadoPostquirurgicoService.update(id, updateEstadoPostquirurgicoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estadoPostquirurgicoService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.estadoPostquirurgicoService.restore(id);
  }
}
