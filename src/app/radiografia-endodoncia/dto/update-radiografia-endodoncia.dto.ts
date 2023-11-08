import { PartialType } from '@nestjs/mapped-types';
import { CreateRadiografiaEndodonciaDto } from './create-radiografia-endodoncia.dto';

export class UpdateRadiografiaEndodonciaDto extends PartialType(CreateRadiografiaEndodonciaDto) {}
