import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateRadiografiaCirugiaDto } from './dto/create-radiografia-cirugia.dto';
import { UpdateRadiografiaCirugiaDto } from './dto/update-radiografia-cirugia.dto';
import { RadiografiaCirugiaService } from './radiografia-cirugia.service';

@Controller('radiografia-cirugia')
export class RadiografiaCirugiaController {
  constructor(private readonly radiografiaCirugiaService: RadiografiaCirugiaService) {}

  @Post('create')
  create(@Body() createRadiografiaCirugiaDto: CreateRadiografiaCirugiaDto) {
    return this.radiografiaCirugiaService.create(createRadiografiaCirugiaDto);
  }

  @Get()
  findAll() {
    return this.radiografiaCirugiaService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.radiografiaCirugiaService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id',ParseIntPipe) id: number) {
    return this.radiografiaCirugiaService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateRadiografiaCirugiaDto: UpdateRadiografiaCirugiaDto) {
    return this.radiografiaCirugiaService.update(id, updateRadiografiaCirugiaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.radiografiaCirugiaService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id',ParseIntPipe) id: number) {
    return this.radiografiaCirugiaService.restore(id);
  }
}
