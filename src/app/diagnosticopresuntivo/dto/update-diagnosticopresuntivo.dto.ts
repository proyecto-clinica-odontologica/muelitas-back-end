import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticopresuntivoDto } from './create-diagnosticopresuntivo.dto';

export class UpdateDiagnosticopresuntivoDto extends PartialType(CreateDiagnosticopresuntivoDto) {}
