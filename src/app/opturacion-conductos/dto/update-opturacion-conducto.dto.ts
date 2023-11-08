import { PartialType } from '@nestjs/mapped-types';
import { CreateOpturacionConductoDto } from './create-opturacion-conducto.dto';

export class UpdateOpturacionConductoDto extends PartialType(CreateOpturacionConductoDto) {}
