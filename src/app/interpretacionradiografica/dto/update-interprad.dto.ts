import { PartialType } from '@nestjs/mapped-types';
import { CreateInterpRadDto } from './create-interprad.dto';

export class UpdateInterpRadDto extends PartialType(CreateInterpRadDto) {}
