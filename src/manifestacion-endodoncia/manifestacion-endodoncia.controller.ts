import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManifestacionEndodonciaService } from './manifestacion-endodoncia.service';
import { CreateManifestacionEndodonciaDto } from './dto/create-manifestacion-endodoncia.dto';
import { UpdateManifestacionEndodonciaDto } from './dto/update-manifestacion-endodoncia.dto';

@Controller('manifestacion-endodoncia')
export class ManifestacionEndodonciaController {
  constructor(private readonly manifestacionEndodonciaService: ManifestacionEndodonciaService) {}

  @Post()
  create(@Param('id') EndodonciaId:number, ManifestacionDolorId:number,@Body() createManifestacionEndodonciaDto: CreateManifestacionEndodonciaDto) {
    return this.manifestacionEndodonciaService.create(EndodonciaId,ManifestacionDolorId,createManifestacionEndodonciaDto);
  }

  @Get()
  findAll() {
    return this.manifestacionEndodonciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manifestacionEndodonciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManifestacionEndodonciaDto: UpdateManifestacionEndodonciaDto) {
    return this.manifestacionEndodonciaService.update(+id, updateManifestacionEndodonciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manifestacionEndodonciaService.remove(+id);
  }
}
