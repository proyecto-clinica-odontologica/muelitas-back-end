import { PartialType } from '@nestjs/mapped-types';
import { CreateTejidosDuroDto } from './create-tejidos-duro.dto';

export class UpdateTejidosDuroDto extends PartialType(CreateTejidosDuroDto) {}
