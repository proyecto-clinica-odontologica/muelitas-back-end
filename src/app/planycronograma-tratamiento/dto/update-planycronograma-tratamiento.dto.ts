import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanycronogramaTratamientoDto } from './create-planycronograma-tratamiento.dto';

export class UpdatePlanycronogramaTratamientoDto extends PartialType(CreatePlanycronogramaTratamientoDto) {}
