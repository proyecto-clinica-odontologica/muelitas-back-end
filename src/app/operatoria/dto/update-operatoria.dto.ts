import { PartialType } from '@nestjs/mapped-types';
import { CreateOperatoriaDto } from './create-operatoria.dto';

export class UpdateOperatoriaDto extends PartialType(CreateOperatoriaDto) {}
