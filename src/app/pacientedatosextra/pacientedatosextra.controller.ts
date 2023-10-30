import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacientedatosextraService } from './pacientedatosextra.service';
import { CreatePacientedatosextraDto } from './dto/create-pacientedatosextra.dto';
import { UpdatePacientedatosextraDto } from './dto/update-pacientedatosextra.dto';

@Controller('pacientedatosextra')
export class PacientedatosextraController {
  constructor(private readonly pacientedatosextraService: PacientedatosextraService) {}

  @Post()
  create(@Body() createPacientedatosextraDto: CreatePacientedatosextraDto) {
    return this.pacientedatosextraService.create(createPacientedatosextraDto);
  }

  @Get()
  findAll() {
    return this.pacientedatosextraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientedatosextraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacientedatosextraDto: UpdatePacientedatosextraDto) {
    return this.pacientedatosextraService.update(+id, updatePacientedatosextraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientedatosextraService.remove(+id);
  }
}
