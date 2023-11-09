import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreatePlanTrabajoDto } from './dto/create-plan-trabajo.dto';
import { UpdatePlanTrabajoDto } from './dto/update-plan-trabajo.dto';
import { PlanTrabajoService } from './plan-trabajo.service';

@Controller('plan-trabajo')
export class PlanTrabajoController {
  constructor(private readonly planTrabajoService: PlanTrabajoService) {}

  @Post('create')
  create(@Body() createPlanTrabajoDto: CreatePlanTrabajoDto) {
    return this.planTrabajoService.create(createPlanTrabajoDto);
  }

  @Get()
  findAll() {
    return this.planTrabajoService.findAll();
  }

  @Get('deleted')
  findAllDeleted() {
    return this.planTrabajoService.findAll();
  }

  @Get('search/id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.planTrabajoService.findOneById(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlanTrabajoDto: UpdatePlanTrabajoDto) {
    return this.planTrabajoService.update(id, updatePlanTrabajoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.planTrabajoService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.planTrabajoService.restore(id);
  }
}
