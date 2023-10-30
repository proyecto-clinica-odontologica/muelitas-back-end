import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OclusionService } from './oclusion.service';
import { CreateOclusionDto } from './dto/create-oclusion.dto';
import { UpdateOclusionDto } from './dto/update-oclusion.dto';

@Controller('oclusion')
export class OclusionController {
  constructor(private readonly oclusionService: OclusionService) {}

  @Post()
  create(@Body() createOclusionDto: CreateOclusionDto) {
    return this.oclusionService.create(createOclusionDto);
  }

  @Get()
  findAll() {
    return this.oclusionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oclusionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOclusionDto: UpdateOclusionDto) {
    return this.oclusionService.update(+id, updateOclusionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oclusionService.remove(+id);
  }
}
