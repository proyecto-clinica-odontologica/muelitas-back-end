import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenGeneralDto } from './create-examen-general.dto';

export class UpdateExamenGeneralDto extends PartialType(CreateExamenGeneralDto) {}
