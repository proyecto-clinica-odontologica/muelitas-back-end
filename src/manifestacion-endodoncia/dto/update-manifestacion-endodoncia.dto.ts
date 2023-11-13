import { PartialType } from '@nestjs/mapped-types';
import { CreateManifestacionEndodonciaDto } from './create-manifestacion-endodoncia.dto';

export class UpdateManifestacionEndodonciaDto extends PartialType(CreateManifestacionEndodonciaDto) {}
