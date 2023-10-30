import { PartialType } from '@nestjs/mapped-types';
import { CreateEpicrisisDto } from './create-epicrisis.dto';

export class UpdateEpicrisisDto extends PartialType(CreateEpicrisisDto) {}
