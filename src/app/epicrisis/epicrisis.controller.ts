import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpicrisisService } from './epicrisis.service';
import { CreateEpicrisisDto } from './dto/create-epicrisis.dto';
import { UpdateEpicrisisDto } from './dto/update-epicrisis.dto';

@Controller('epicrisis')
export class EpicrisisController {
  constructor(private readonly epicrisisService: EpicrisisService) {}

  @Post()
  create(@Body() createEpicrisisDto: CreateEpicrisisDto) {
    return this.epicrisisService.create(createEpicrisisDto);
  }

  @Get()
  findAll() {
    return this.epicrisisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.epicrisisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpicrisisDto: UpdateEpicrisisDto) {
    return this.epicrisisService.update(+id, updateEpicrisisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epicrisisService.remove(+id);
  }
}
