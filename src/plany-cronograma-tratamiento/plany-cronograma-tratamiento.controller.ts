import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanyCronogramaTratamientoService } from './plany-cronograma-tratamiento.service';
import { CreatePlanyCronogramaTratamientoDto } from './dto/create-plany-cronograma-tratamiento.dto';
import { UpdatePlanyCronogramaTratamientoDto } from './dto/update-plany-cronograma-tratamiento.dto';

@Controller('plany-cronograma-tratamiento')
export class PlanyCronogramaTratamientoController {
  constructor(private readonly planyCronogramaTratamientoService: PlanyCronogramaTratamientoService) {}

  @Post(':id')
  create(@Param('id') PacienteId:number, @Body() createPlanyCronogramaTratamientoDto: CreatePlanyCronogramaTratamientoDto) {
    return this.planyCronogramaTratamientoService.create(PacienteId,createPlanyCronogramaTratamientoDto);
  }

  @Get()
  findAll() {
    return this.planyCronogramaTratamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planyCronogramaTratamientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanyCronogramaTratamientoDto: UpdatePlanyCronogramaTratamientoDto) {
    return this.planyCronogramaTratamientoService.update(+id, updatePlanyCronogramaTratamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Number) {
    return this.planyCronogramaTratamientoService.remove(+id);
  }
}
