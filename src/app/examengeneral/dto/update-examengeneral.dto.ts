import { PartialType } from '@nestjs/mapped-types';
import { CreateExamengeneralDto } from './create-examengeneral.dto';

export class UpdateExamengeneralDto extends PartialType(CreateExamengeneralDto) {}
