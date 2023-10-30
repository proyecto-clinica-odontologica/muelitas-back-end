import { PartialType } from '@nestjs/mapped-types';
import { CreateNotasEvolutivaDto } from './create-notas-evolutiva.dto';

export class UpdateNotasEvolutivaDto extends PartialType(CreateNotasEvolutivaDto) {}
