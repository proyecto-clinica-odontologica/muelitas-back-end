import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCasoclinicoDto } from './create-subcasoclinico.dto';

export class UpdateSubCasoclinicoDto extends PartialType(CreateSubCasoclinicoDto) {}