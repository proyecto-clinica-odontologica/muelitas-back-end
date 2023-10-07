import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresasService } from './empresas.service';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  registrarEmpresa(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.registrarEmpresa(createEmpresaDto);
  }

  @Get()
  obtenerEmpresas() {
    return this.empresasService.obtenerEmpresas();
  }

  @Get(':id')
  buscarUnaEmpresa(@Param('id') id: string) {
    return this.empresasService.buscarUnaEmpresa(+id);
  }

  @Patch(':id')
  actualizarEmpresa(
    @Param('id') id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresasService.actualizarEmpresa(+id, updateEmpresaDto);
  }

  @Delete(':id')
  eliminarEmpresa(@Param('id') id: string) {
    return this.empresasService.eliminarEmpresa(+id);
  }

  @Patch('restaurar/:id')
  restaurarEmpresa(@Param('id') id: string) {
    return this.empresasService.restaurarEmpresa(+id);
  }
}
