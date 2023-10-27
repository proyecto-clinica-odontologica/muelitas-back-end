import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticoPresuntivoDto } from './create-diagnostico-presuntivo.dto';

export class UpdateDiagnosticoPresuntivoDto extends PartialType(CreateDiagnosticoPresuntivoDto) {}
