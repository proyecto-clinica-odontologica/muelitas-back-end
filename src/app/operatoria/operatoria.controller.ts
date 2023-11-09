import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateOperatoriaDto } from './dto/create-operatoria.dto';
import { UpdateOperatoriaDto } from './dto/update-operatoria.dto';
import { OperatoriaService } from './operatoria.service';

@Controller('operatoria')
export class OperatoriaController {
  constructor(private readonly operatoriaService: OperatoriaService) {}

  @Post('create')
  create(@Body() createOperatoriaDto: CreateOperatoriaDto) {
    return this.operatoriaService.create(createOperatoriaDto);
  }

  @Get()
  findAll() {
    return this.operatoriaService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.operatoriaService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.operatoriaService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOperatoriaDto: UpdateOperatoriaDto) {
    return this.operatoriaService.update(id, updateOperatoriaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.operatoriaService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.operatoriaService.restore(id);
  }
}
