import { PartialType } from '@nestjs/mapped-types';
import { CreateAnivelPiezaDto } from './create-anivel-pieza.dto';

export class UpdateAnivelPiezaDto extends PartialType(CreateAnivelPiezaDto) {}
