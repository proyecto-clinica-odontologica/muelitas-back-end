import { PartialType } from '@nestjs/mapped-types';
import { CreateRadiografiaCirugiaDto } from './create-radiografia-cirugia.dto';

export class UpdateRadiografiaCirugiaDto extends PartialType(CreateRadiografiaCirugiaDto) {}
