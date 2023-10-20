import { PartialType } from '@nestjs/mapped-types';
import { CreateMapeoDto } from './create-mapeo.dto';

export class UpdateMapeoDto extends PartialType(CreateMapeoDto) {}
