import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreatePlanycronogramaTratamientoDto } from './dto/create-planycronograma-tratamiento.dto';
import { UpdatePlanycronogramaTratamientoDto } from './dto/update-planycronograma-tratamiento.dto';
import { PlanycronogramaTratamientoService } from './planycronograma-tratamiento.service';

@Controller('planycronograma-tratamiento')
export class PlanycronogramaTratamientoController {
  constructor(private readonly planycronogramaTratamientoService: PlanycronogramaTratamientoService) {}

  @Post()
  registrarPlanCronograma(@Body() createPlanycronogramaTratamientoDto: CreatePlanycronogramaTratamientoDto) {
    return this.planycronogramaTratamientoService.registrarPlanCronograma(createPlanycronogramaTratamientoDto);
  }

  @Get()
  obtenerPlanesCronogramas() {
    return this.planycronogramaTratamientoService.obtenerPlanesCronogramas();
  }

  @Get('deleted')
  obtenerPlanesCronogramasEliminados() {
    return this.planycronogramaTratamientoService.obtenerPlanesCronogramasEliminados();
  }

  @Get('search/id/:id')
  bucarPlanCronograma(@Param('id') id: string) {
    return this.planycronogramaTratamientoService.bucarPlanCronogramaPorId(+id);
  }

  @Put('update/:id')
  actualizarPlanCronograma(
    @Param('id') id: string,
    @Body() updatePlanycronogramaTratamientoDto: UpdatePlanycronogramaTratamientoDto,
  ) {
    return this.planycronogramaTratamientoService.actualizarPlanCronograma(+id, updatePlanycronogramaTratamientoDto);
  }

  @Delete('delete/:id')
  eliminarPlanCronograma(@Param('id') id: string) {
    return this.planycronogramaTratamientoService.eliminarPlanCronograma(+id);
  }

  @Patch('restore/:id')
  restaurarPlanCronograma(@Param('id') id: string) {
    return this.planycronogramaTratamientoService.restaurarPlanCronograma(+id);
  }
}
