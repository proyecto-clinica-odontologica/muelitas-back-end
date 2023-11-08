import { PartialType } from '@nestjs/mapped-types';
import { CreateCirugiaDto } from './create-cirugia.dto';

export class UpdateCirugiaDto extends PartialType(CreateCirugiaDto) {}
