import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenEstomatologicoDto } from './create-examen-estomatologico.dto';

export class UpdateExamenEstomatologicoDto extends PartialType(CreateExamenEstomatologicoDto) {}
