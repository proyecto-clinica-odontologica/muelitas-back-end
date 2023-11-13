import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManifestacionDolorService } from './manifestacion-dolor.service';
import { CreateManifestacionDolorDto } from './dto/create-manifestacion-dolor.dto';
import { UpdateManifestacionDolorDto } from './dto/update-manifestacion-dolor.dto';

@Controller('manifestacion-dolor')
export class ManifestacionDolorController {
  constructor(private readonly manifestacionDolorService: ManifestacionDolorService) {}

  @Post()
  create(@Body() createManifestacionDolorDto: CreateManifestacionDolorDto) {
    return this.manifestacionDolorService.create(createManifestacionDolorDto);
  }

  @Get()
  findAll() {
    return this.manifestacionDolorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manifestacionDolorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManifestacionDolorDto: UpdateManifestacionDolorDto) {
    return this.manifestacionDolorService.update(+id, updateManifestacionDolorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manifestacionDolorService.remove(+id);
  }
}
