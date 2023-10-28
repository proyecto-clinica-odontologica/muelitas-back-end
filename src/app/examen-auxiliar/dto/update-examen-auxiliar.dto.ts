import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenAuxiliarDto } from './create-examen-auxiliar.dto';

export class UpdateExamenAuxiliarDto extends PartialType(CreateExamenAuxiliarDto) {}
