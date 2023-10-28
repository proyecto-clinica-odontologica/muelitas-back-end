import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticoDefinitivoDto } from './create-diagnostico-definitivo.dto';

export class UpdateDiagnosticoDefinitivoDto extends PartialType(CreateDiagnosticoDefinitivoDto) {}
