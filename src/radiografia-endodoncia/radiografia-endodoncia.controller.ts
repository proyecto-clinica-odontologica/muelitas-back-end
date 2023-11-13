import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RadiografiaEndodonciaService } from './radiografia-endodoncia.service';
import { CreateRadiografiaEndodonciaDto } from './dto/create-radiografia-endodoncia.dto';
import { UpdateRadiografiaEndodonciaDto } from './dto/update-radiografia-endodoncia.dto';

@Controller('radiografia-endodoncia')
export class RadiografiaEndodonciaController {
  constructor(private readonly radiografiaEndodonciaService: RadiografiaEndodonciaService) {}

  @Post()
  create(@Param('id') EndodonciaId:number,@Body() createRadiografiaEndodonciaDto: CreateRadiografiaEndodonciaDto) {
    return this.radiografiaEndodonciaService.create(EndodonciaId,createRadiografiaEndodonciaDto);
  }

  @Get()
  findAll() {
    return this.radiografiaEndodonciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.radiografiaEndodonciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRadiografiaEndodonciaDto: UpdateRadiografiaEndodonciaDto) {
    return this.radiografiaEndodonciaService.update(+id, updateRadiografiaEndodonciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.radiografiaEndodonciaService.remove(+id);
  }
}
