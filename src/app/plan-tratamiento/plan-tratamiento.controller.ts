import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreatePlanTratamientoDto } from './dto/create-plan-tratamiento.dto';
import { UpdatePlanTratamientoDto } from './dto/update-plan-tratamiento.dto';
import { PlanTratamientoService } from './plan-tratamiento.service';

@Controller('plan-tratamiento')
export class PlanTratamientoController {
  constructor(private readonly planTratamientoService: PlanTratamientoService) {}

  @Post('create')
  create(@Body() createPlanTratamientoDto: CreatePlanTratamientoDto) {
    return this.planTratamientoService.create(createPlanTratamientoDto);
  }

  @Get()
  findAll() {
    return this.planTratamientoService.findAll();
  }

  @Get('deleted')
  findAllDelete() {
    return this.planTratamientoService.findAllDelete();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.planTratamientoService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlanTratamientoDto: UpdatePlanTratamientoDto) {
    return this.planTratamientoService.update(id, updatePlanTratamientoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.planTratamientoService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.planTratamientoService.restore(id);
  }
}
