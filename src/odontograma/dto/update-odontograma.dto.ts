import { PartialType } from '@nestjs/mapped-types';
import { CreateOdontogramaDto } from './create-odontograma.dto';

export class UpdateOdontogramaDto extends PartialType(CreateOdontogramaDto) {}
