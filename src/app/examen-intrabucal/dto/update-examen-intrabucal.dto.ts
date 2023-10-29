import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenIntrabucalDto } from './create-examen-intrabucal.dto';

export class UpdateExamenIntrabucalDto extends PartialType(CreateExamenIntrabucalDto) {}
