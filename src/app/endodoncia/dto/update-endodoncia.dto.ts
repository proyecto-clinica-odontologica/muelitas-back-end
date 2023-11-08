import { PartialType } from '@nestjs/mapped-types';
import { CreateEndodonciaDto } from './create-endodoncia.dto';

export class UpdateEndodonciaDto extends PartialType(CreateEndodonciaDto) {}
