import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanyCronogramaTratamientoDto } from './create-plany-cronograma-tratamiento.dto';

export class UpdatePlanyCronogramaTratamientoDto extends PartialType(CreatePlanyCronogramaTratamientoDto) {}
