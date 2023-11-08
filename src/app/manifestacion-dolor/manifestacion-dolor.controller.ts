import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateManifestacionDolorDto } from './dto/create-manifestacion-dolor.dto';
import { UpdateManifestacionDolorDto } from './dto/update-manifestacion-dolor.dto';
import { ManifestacionDolorService } from './manifestacion-dolor.service';

@Controller('manifestacion-dolor')
export class ManifestacionDolorController {
  constructor(private readonly manifestacionDolorService: ManifestacionDolorService) {}

  @Post('create')
  create(@Body() createManifestacionDolorDto: CreateManifestacionDolorDto) {
    return this.manifestacionDolorService.create(createManifestacionDolorDto);
  }

  @Get()
  findAll() {
    return this.manifestacionDolorService.findAll();
  }

  @Get('deleted')
  findAllDelete() {
    return this.manifestacionDolorService.findAllDelete();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.manifestacionDolorService.findOneById(id);
  }

  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateManifestacionDolorDto: UpdateManifestacionDolorDto) {
    return this.manifestacionDolorService.update(id, updateManifestacionDolorDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.manifestacionDolorService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.manifestacionDolorService.restore(id);
  }
}
