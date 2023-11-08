import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateManifestacionEndodonciaDto } from './dto/create-manifestacion-endodoncia.dto';
import { ManifestacionEndodonciaService } from './manifestacion-endodoncia.service';

@Controller('manifestacion-endodoncia')
export class ManifestacionEndodonciaController {
  constructor(private readonly manifestacionEndodonciaService: ManifestacionEndodonciaService) {}

  @Post('create')
  create(@Body() createManifestacionEndodonciaDto: CreateManifestacionEndodonciaDto) {
    return this.manifestacionEndodonciaService.create(createManifestacionEndodonciaDto);
  }

  @Get()
  findAll() {
    return this.manifestacionEndodonciaService.findAll();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.manifestacionEndodonciaService.findOne(id);
  }
}
