import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticoDto } from './create-diagnostico.dto';

export class UpdateDiagnosticoDto extends PartialType(CreateDiagnosticoDto) {}
