import { PartialType } from '@nestjs/mapped-types';
import { CreateOclusionDto } from './create-oclusion.dto';

export class UpdateOclusionDto extends PartialType(CreateOclusionDto) {}
