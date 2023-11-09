import { PartialType } from '@nestjs/mapped-types';
import { CreateInterpretacionRadiograficaDto } from './create-interpretacion-radiografica.dto';

export class UpdateInterpretacionRadiograficaDto extends PartialType(CreateInterpretacionRadiograficaDto) {}
