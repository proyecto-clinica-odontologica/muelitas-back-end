import { PartialType } from '@nestjs/mapped-types';
import { CreateInterpretacionDto } from './create-interpretacion.dto';

export class UpdateInterpretacionDto extends PartialType(CreateInterpretacionDto) {}
