import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EndodonciaService } from './endodoncia.service';
import { CreateEndodonciaDto } from './dto/create-endodoncia.dto';
import { UpdateEndodonciaDto } from './dto/update-endodoncia.dto';

@Controller('endodoncia')
export class EndodonciaController {
  constructor(private readonly endodonciaService: EndodonciaService) {}

  @Post(':id')
  create(@Param('id') PacienteId:number, @Body() createEndodonciaDto: CreateEndodonciaDto) {
    return this.endodonciaService.create(PacienteId, createEndodonciaDto);
  }

  @Get()
  findAll() {
    return this.endodonciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.endodonciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEndodonciaDto: UpdateEndodonciaDto) {
    return this.endodonciaService.update(+id, updateEndodonciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.endodonciaService.remove(+id);
  }
}
