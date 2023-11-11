import { PartialType } from '@nestjs/mapped-types';
import { CreateInfQuirurgicoDto } from './create-infquirurgico.dto';

export class UpdateInfQuirurgicoDto extends PartialType(CreateInfQuirurgicoDto) {}
