import { PartialType } from '@nestjs/mapped-types';
import { CreateNotaEvolutivaDto } from './create-nota-evolutiva.dto';

export class UpdateNotaEvolutivaDto extends PartialType(CreateNotaEvolutivaDto) {}
