import { PartialType } from '@nestjs/mapped-types';
import { CreateManifestacionDolorDto } from './create-manifestacion-dolor.dto';

export class UpdateManifestacionDolorDto extends PartialType(CreateManifestacionDolorDto) {}
