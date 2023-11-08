import { PartialType } from '@nestjs/mapped-types';
import { CreateConductometriaDto } from './create-conductometria.dto';

export class UpdateConductometriaDto extends PartialType(CreateConductometriaDto) {}
