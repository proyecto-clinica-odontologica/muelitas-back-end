import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateInformeQuirurgicoDto } from './dto/create-informe-quirurgico.dto';
import { UpdateInformeQuirurgicoDto } from './dto/update-informe-quirurgico.dto';
import { InformeQuirurgicoService } from './informe-quirurgico.service';

@Controller('informe-quirurgico')
export class InformeQuirurgicoController {
  constructor(private readonly informeQuirurgicoService: InformeQuirurgicoService) {}

  @Post('create')
  create(@Body() createInformeQuirurgicoDto: CreateInformeQuirurgicoDto) {
    return this.informeQuirurgicoService.create(createInformeQuirurgicoDto);
  }

  @Get()
  findAll() {
    return this.informeQuirurgicoService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.informeQuirurgicoService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.informeQuirurgicoService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInformeQuirurgicoDto: UpdateInformeQuirurgicoDto) {
    return this.informeQuirurgicoService.update(id, updateInformeQuirurgicoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.informeQuirurgicoService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.informeQuirurgicoService.restore(id);
  }
}
