import { PartialType } from '@nestjs/mapped-types';
import { CreatePruebaOperatoriaDto } from './create-prueba-operatoria.dto';

export class UpdatePruebaOperatoriaDto extends PartialType(CreatePruebaOperatoriaDto) {}
