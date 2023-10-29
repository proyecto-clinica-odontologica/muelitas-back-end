import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOclusionDto } from './dto/create-oclusion.dto';
import { UpdateOclusionDto } from './dto/update-oclusion.dto';
import { OclusionService } from './oclusion.service';

@Controller('oclusion')
export class OclusionController {
  constructor(private readonly oclusionService: OclusionService) {}

  @Post('create')
  registrarOclusion(@Body() createOclusionDto: CreateOclusionDto) {
    return this.oclusionService.registrarOclusion(createOclusionDto);
  }

  @Get()
  obtenerOclusiones() {
    return this.oclusionService.obtenerOclusiones();
  }

  @Get('deleted')
  obtenerOclusionesEliminadas() {
    return this.oclusionService.obtenerOclusionesEliminadas();
  }

  @Get('search/:id')
  buscarOclusionPorId(@Param('id') id: string) {
    return this.oclusionService.buscarOclusionPorId(+id);
  }

  @Patch('update/:id')
  actualizarOclusion(@Param('id') id: string, @Body() updateOclusionDto: UpdateOclusionDto) {
    return this.oclusionService.actualizarOclusion(+id, updateOclusionDto);
  }

  @Delete('delete/:id')
  eliminarOclusion(@Param('id') id: string) {
    return this.oclusionService.eliminarOclusion(+id);
  }

  @Patch('restore/:id')
  restaurarOclusion(@Param('id') id: string) {
    return this.oclusionService.restaurarOclusion(+id);
  }
}
