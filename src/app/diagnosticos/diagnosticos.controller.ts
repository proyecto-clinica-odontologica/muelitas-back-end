import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DiagnosticosService } from './diagnosticos.service';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dto/update-diagnostico.dto';

@Controller('diagnosticos')
export class DiagnosticosController {
  constructor(private readonly diagnosticosService: DiagnosticosService) {}

  @Post('create')
  create(@Body() createDiagnosticoDto: CreateDiagnosticoDto) {
    return this.diagnosticosService.create(createDiagnosticoDto);
  }

  @Get()
  findAll() {
    return this.diagnosticosService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.diagnosticosService.findAllDeleted();
  }

  @Get('search/id/:id')
  findOneById(@Param('id') id: string) {
    return this.diagnosticosService.findOneById(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateDiagnosticoDto: UpdateDiagnosticoDto) {
    return this.diagnosticosService.update(+id, updateDiagnosticoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.diagnosticosService.remove(+id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.diagnosticosService.restore(+id);
  }
}
