import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguimientoDto } from './create-seguimiento.dto';

export class UpdateSeguimientoDto extends PartialType(CreateSeguimientoDto) {}
