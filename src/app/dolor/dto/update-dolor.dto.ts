import { PartialType } from '@nestjs/mapped-types';
import { CreateDolorDto } from './create-dolor.dto';

export class UpdateDolorDto extends PartialType(CreateDolorDto) {}
