import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanTratamientoDto } from './create-plan-tratamiento.dto';

export class UpdatePlanTratamientoDto extends PartialType(CreatePlanTratamientoDto) {}
