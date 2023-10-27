import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOdontogramaDto } from './dto/create-odontograma.dto';
import { UpdateOdontogramaDto } from './dto/update-odontograma.dto';
import { OdontogramaService } from './odontograma.service';

@Controller('odontograma')
export class OdontogramaController {
  constructor(private readonly odontogramaService: OdontogramaService) {}

  @Post()
  create(@Body() createOdontogramaDto: CreateOdontogramaDto) {
    return this.odontogramaService.create(createOdontogramaDto);
  }

  @Get()
  findAll() {
    return this.odontogramaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odontogramaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOdontogramaDto: UpdateOdontogramaDto) {
    return this.odontogramaService.update(+id, updateOdontogramaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odontogramaService.remove(+id);
  }
}
