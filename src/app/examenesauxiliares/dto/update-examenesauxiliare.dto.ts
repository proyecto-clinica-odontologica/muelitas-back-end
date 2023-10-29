import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenesauxiliareDto } from './create-examenesauxiliare.dto';

export class UpdateExamenesauxiliareDto extends PartialType(CreateExamenesauxiliareDto) {}
