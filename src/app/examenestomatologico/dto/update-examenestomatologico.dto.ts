import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenestomatologicoDto } from './create-examenestomatologico.dto';

export class UpdateExamenestomatologicoDto extends PartialType(CreateExamenestomatologicoDto) {}
