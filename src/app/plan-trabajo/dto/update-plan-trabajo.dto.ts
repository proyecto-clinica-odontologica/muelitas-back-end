import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanTrabajoDto } from './create-plan-trabajo.dto';

export class UpdatePlanTrabajoDto extends PartialType(CreatePlanTrabajoDto) {}
