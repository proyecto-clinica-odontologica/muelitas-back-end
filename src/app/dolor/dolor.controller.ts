import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DolorService } from './dolor.service';
import { CreateDolorDto } from './dto/create-dolor.dto';
import { UpdateDolorDto } from './dto/update-dolor.dto';

@Controller('dolor')
export class DolorController {
  constructor(private readonly dolorService: DolorService) {}

  @Post()
  create(@Body() createDolorDto: CreateDolorDto) {
    return this.dolorService.create(createDolorDto);
  }

  @Get()
  findAll() {
    return this.dolorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dolorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDolorDto: UpdateDolorDto) {
    return this.dolorService.update(+id, updateDolorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dolorService.remove(+id);
  }
}
