import { PartialType } from '@nestjs/mapped-types';
import { CreatePreparacionQuimicaDto } from './create-preparacion-quimica.dto';

export class UpdatePreparacionQuimicaDto extends PartialType(CreatePreparacionQuimicaDto) {}
