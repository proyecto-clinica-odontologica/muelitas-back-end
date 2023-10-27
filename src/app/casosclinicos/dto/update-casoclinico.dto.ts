import { PartialType } from '@nestjs/mapped-types';
import { CreateCasoclinicoDto } from './create-casoclinico.dto';

export class UpdateCasoclinicoDto extends PartialType(CreateCasoclinicoDto) {}